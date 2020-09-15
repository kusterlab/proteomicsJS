const assert = require('assert');
const chai = require('chai');
const chaiAlmost = require('chai-almost');
const _ = require('lodash');
// const annotate = require('../annotate');
const binary = require('../binary');
const AnnotationTransformer = require('../AnnotationTransformer');

chai.use(chaiAlmost()); // tolerance of 10^-6
chai.use(chaiAlmost(0.00001));
const { expect } = chai;
//
//

describe('Annotate complex spectrum', () => {
	var response = {};
	var request = {};
  beforeEach(() => {
    response =  require("./mzspec:PXD000561:Adult_Frontalcortex_bRP_Elite_85_f09:scan:17555:VLHPLEGAVVIIFK_2_all_types_all_loses_response.json");
    request = require("./mzspec:PXD000561:Adult_Frontalcortex_bRP_Elite_85_f09:scan:17555:VLHPLEGAVVIIFK_2_all_types_all_loses_request.json");
  });
/*
    it('peaks_1', () => {

      const annotation = new AnnotationTransformer.Annotation(request);
	  const r = annotation.fakeAPI();
      expect(r.peaks).to.almost.eql(response.peaks);
    });*/
/*
    it('peaks_2', () => {

      var annotation = new AnnotationTransformer.Annotation(request);
	  var r = annotation.fakeAPI();
      expect(r.fragments.length).to.almost.eql(response.fragments.length);
    });
    */
	/*
    it('peaks_4', () => {

      var annotation = new AnnotationTransformer.Annotation(request);
	  var r = annotation.fakeAPI();
      expect(r.peaks[10]).to.almost.eql(response.peaks[10]);
    });
    */

    it('peaks_5', () => {

      var annotation = new AnnotationTransformer.Annotation(request);
	  var fuckJavascript = annotation.fakeAPI();
      expect(fuckJavascript.peaks).to.almost.eql(response.peaks);
    });
    
/*	
    it('peaks_6', () => {

      var annotation = new AnnotationTransformer.Annotation(request);
	  var r = annotation.fakeAPI();
      expect(r.peaks).to.almost.eql(response.peaks);
    });
	*/
    
    it('peaks_7', () => {

      var annotation = new AnnotationTransformer.Annotation(request);
      expect(request.fragmentTypes.x.selected).to.equal(true);
//	  var r = annotation.fakeAPI();
 //     expect(request.fragmentTypes.x.selected).to.almost.eql(true);
    });
    
    it('peaks_123', () => {

      expect(request.fragmentTypes.x.selected).to.almost.eql(true);
      var annotation = new AnnotationTransformer.Annotation(request);
	  var t1 = annotation.fakeAPI();
	    var a = t1.fragments.filter((e) => {return e.number === 2})
	    	.filter((e) => {return e.neutralLoss === null})
	    	.filter((e) => {return e.charge === 1})
	    	.filter((e) => {return e.type === "x"});
	    var b = response.fragments.filter((e) => {return e.number ===2})
	    	.filter((e) => {return e.neutralLoss === null})
	    	.filter((e) => {return e.charge === 1})
	    	.filter((e) => {return e.type === "x"});
      expect(a).to.almost.eql(b);
	    var a = t1.fragments.filter((e) => {return e.number === 11})
	    	.filter((e) => {return e.neutralLoss === "-CO2"})
	    	.filter((e) => {return e.charge === 1})
	    	.filter((e) => {return e.type === "x"});
	    var b = response.fragments.filter((e) => {return e.number === 11})
	    	.filter((e) => {return e.neutralLoss === "-CO2"})
	    	.filter((e) => {return e.charge === 1})
	    	.filter((e) => {return e.type === "x"});
      expect(a).to.almost.eql(b);
    });
    it('peaks_1234_a', () => {

      expect(request.fragmentTypes.x.selected).to.almost.eql(true);
      var annotation = new AnnotationTransformer.Annotation(request);
	  var t1 = annotation.fakeAPI();
	    var a = t1.fragments.filter((e) => {return e.number === 2})
	    	.filter((e) => {return e.neutralLoss === null})
	    	.filter((e) => {return e.charge === 1})
	    	.filter((e) => {return e.type === "a"});
	    var b = response.fragments.filter((e) => {return e.number ===2})
	    	.filter((e) => {return e.neutralLoss === null})
	    	.filter((e) => {return e.charge === 1})
	    	.filter((e) => {return e.type === "a"});
      expect(a).to.almost.eql(b);
	    var a = t1.fragments.filter((e) => {return e.number === 11})
	    	.filter((e) => {return e.neutralLoss === "-CO2"})
	    	.filter((e) => {return e.charge === 1})
	    	.filter((e) => {return e.type === "a"});
	    var b = response.fragments.filter((e) => {return e.number === 11})
	    	.filter((e) => {return e.neutralLoss === "-CO2"})
	    	.filter((e) => {return e.charge === 1})
	    	.filter((e) => {return e.type === "a"});
      expect(a).to.almost.eql(b);
    });
    it('peaks_1234_y', () => {

      expect(request.fragmentTypes.x.selected).to.almost.eql(true);
      var annotation = new AnnotationTransformer.Annotation(request);
	  var t1 = annotation.fakeAPI();
	    var a = t1.fragments.filter((e) => {return e.number === 2})
	    	.filter((e) => {return e.neutralLoss === null})
	    	.filter((e) => {return e.charge === 1})
	    	.filter((e) => {return e.type === "y"});
	    var b = response.fragments.filter((e) => {return e.number ===2})
	    	.filter((e) => {return e.neutralLoss === null})
	    	.filter((e) => {return e.charge === 1})
	    	.filter((e) => {return e.type === "y"});
      expect(a).to.almost.eql(b);
	    var a = t1.fragments.filter((e) => {return e.number === 11})
	    	.filter((e) => {return e.neutralLoss === "-CO2"})
	    	.filter((e) => {return e.charge === 1})
	    	.filter((e) => {return e.type === "y"});
	    var b = response.fragments.filter((e) => {return e.number === 11})
	    	.filter((e) => {return e.neutralLoss === "-CO2"})
	    	.filter((e) => {return e.charge === 1})
	    	.filter((e) => {return e.type === "y"});
      expect(a).to.almost.eql(b);
    });
	/*
    it('peaks_amount', () => {

      var annotation = new AnnotationTransformer.Annotation(request);
	  var r = annotation.fakeAPI();
      expect(r.peaks.length).to.almost.eql(response.peaks.length); // 564
    }); */
});

//
//
//
