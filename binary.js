// [{"mz": v1, "intensity": v2}, ...]
// TODO needs a sorted array
var binarySearch = function(arr,target){
	var midpoint = Math.floor(arr.length/2);

	if (arr[midpoint] === target){
		return arr[midpoint];
	}
	if (arr.length === 1){
		return arr[0];
	}

	if (arr[midpoint] > target){
		return binarySearch(arr.slice(0,midpoint),target);
	}else if (arr[midpoint] < target){
		return binarySearch(arr.slice(midpoint),target);
	}
}

var binarySearch_spec = function(arr,target){
	var midpoint = Math.floor(arr.length/2);

	if (arr[midpoint]["mz"] == target){
		return arr[midpoint];
	}
	if (arr.length == 1){
		return arr[0];
	}

	if (arr[midpoint]["mz"] > target){
		return binarySearch_spec(arr.slice(0,midpoint),target);
	}else if (arr[midpoint]["mz"] < target){
		return binarySearch_spec(arr.slice(midpoint),target);
	}
}

var my_sorter = function(attribute, type){ 
	return function(peak1, peak2){
		if (peak1[attribute] > peak2[attribute]) {
			return type==="asc"?1:-1;
		}
		if (peak2[attribute] > peak1[attribute]) {
			return type==="asc"?-1:1;
		}
		return 0;
	}
}



/*
 *peak 1 is always reference (we assume the bottom/predicted one
 * checking for smaller or greater not equal case
 */
exports.compare_ppm = function(peak1, peak2, ppm){
	// asking if peak2 is close to peak1
	error = 1 / Math.pow(10, 6) * ppm * peak1["mz"]
	return(peak2["mz"] < peak1["mz"] + error && peak2["mz"] > peak1["mz"] - error)
}
exports.my_sorter = my_sorter

var generate_searchF = function(spectrum){
	return function(peak){
		a = binarySearch_spec(spectrum, peak["mz"])
		is_inside = exports.compare_ppm(a, peak, 20)
		if(is_inside){
			if(peak["exp_intensity"] < a["intensity"]){
				// If a second predicted/reference peak would match to an experimental one. use the one with higher intensity
				peak["exp_intensity"] = a["intensity"]
			}
		}else{
			peak["exp_intensity"] = 0
		}
		return(peak)
	}
}
exports.generate_searchF = generate_searchF

exports.add_exp_flag = function(peak){
	peak["exp_intensity"] = 0
	return(peak)
}
exports.extract_mzs = function(prev, peak){
	prev["intensity_1"].push( peak["exp_intensity"])
	prev["intensity_2"].push(  peak["intensity"])
	return(prev)
}

