
## SETUP 

```
npm install
```

```
./node_modules/watchify/bin/cmd.js  generate_random_peptides.js -o bundle.js 
```

```
python -m http.server 8000
```

## STEPS
get 1000 predictions

1. Create baseline by calculating the similiarity score *s_correct* for the assigned sequence
2. Create 1000 string versions of the assigned sequence and record their scores. (*)
3. Create the survival function $s(x) = 1- F(x)$ in log/log space.
4. According to the *extreme value theory* one can assume linearity for $log(s(x)) < log(0.1)$ and we can create a linear model $m$
5. Calculate for *s_correct& the expectation_value 

(*) We create 1000 random string shuffles of the queried sequence. Be aware, to be more conservative we should generate not complete random sequences from the original sequence. By shuffling just neighboring amino acid patches we keep some parts of the y/b ion series intact.

```{r}
CUTOFF = 0.1
N = 1
#CUTOFF = 0.95
BEST_VALUE = abs(0.95721)
correlation_values = abs(rlc[!is.na(rlc)][rlc[!is.na(rlc)] > 0])
g = ecdf(correlation_values)
data4fit = data.frame(
  x_log = log(sort(correlation_values)),
  y_log = log(1 - g(sort(correlation_values))),
  x = sort(correlation_values),
  y = 1 - g(sort(correlation_values))
)
setDT(data4fit)
data4fit = data4fit[is.finite(y_log)]
plot(data4fit$x, data4fit$y, log = "xy", xlab = "ln(x)", ylab = "s(x)")

m = lm(y_log ~ x_log, data4fit[y_log < log(CUTOFF)])
lines(exp(data4fit[y_log < log(CUTOFF)]$x_log),
      exp(predict(m, data4fit[y_log < log(CUTOFF)])),
      col = "red",
      lwd = 3)

# evaluate
to_be_expected = data.frame(x_log = c(log(BEST_VALUE)))
expectation_value = N * exp(predict(m, to_be_expected))
  
```
