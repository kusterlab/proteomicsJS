

const assert = require('assert');
const chai = require('chai');
const chaiAlmost = require('chai-almost');
const _ = require('lodash');
const annotate = require('../annotate');
const binary = require('../binary');


chai.use(chaiAlmost()); //tolerance of 10^-6
chai.use(chaiAlmost(0.0001));
const { expect } = chai;
//

function transformIsPPM(json){
	json["isPPM"] = json["toleranceType"] === "ppm";
	return json;
}


// https://db.systemsbiology.net/sbeams/cgi/PeptideAtlas/ShowObservedSpectrum?USI=mzspec:PXD000561:Adult_Frontalcortex_bRP_Elite_85_f09:scan:17555:VLHPLEGAVVIIFK/2
describe('Parse USI endpoints', () => {

	describe('PeptideAtlas', ()=> {
		let response = "";
		beforeEach(() => {


			response = `
				<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 Final//EN">
				<HTML>
				<head>
				<meta http-equiv="X-UA-Compatible" content="chrome=IE8,IE=edge">

				<title>PeptideAtlas</title>
				</head>

				<!-- Style sheet definition ------------------------------------------------- -->
				<style type="text/css">	<!--

				.TopTitle { font-family: Arial, Helvetica, Verdana, sans-serif; font-size:18px; color:#ffffff; font-weight: bold; }

				.leftnavlink {
					font-family: Arial, Helvetica, Verdana, sans-serif;
					font-size:12px;
					color:#666666;
					text-decoration:none;
					line-height:16px;
					font-weight:normal}
				.leftnavlink:hover {color: #c28962;}
				.leftnavlinkstate {cursor: pointer; font-family:arial,helvetica,sans serif; font-size:12px; letter-spacing:.5px; color:#F3F1E4;}


				.textlink {
					font-family: Helvetica, Arial,  Verdana, sans-serif;
					font-size:12px;
					color:#fc7907;
					text-decoration:none;
					line-height:16px;
					font-weight:normal}
				.textlink:hover {color: #294A93;}
				.textlinkstate {cursor: pointer; font-family: helvetica, arial, sans serif; font-size:12px; letter-spacing:.5px; color:#F3F1E4;}

				.largelink {
					font-family: Helvetica, Arial,  Verdana, sans-serif;
					font-size:16px;
					color:#c28962;
					text-decoration:none;
					line-height:20px;
					font-weight:bold}
				.largelink:hover {color: #294A93;}
				.largelinkstate {cursor: pointer; font-family: helvetica, arial, sans serif; font-size:16px; letter-spacing:.5px; color:#F3F1E4;}






			h1  { font-family: Helvetica, Arial, Verdana, sans-serif; font-size: 18pt; font-weight:bold; color:#666;line-height:20px;}
			h2  { font-family: Helvetica, Arial, Verdana, sans-serif; font-size: 14pt; font-weight: bold; color: #004896; }
			h3  { font-family: Helvetica, Arial, Verdana, sans-serif; font-size: 12pt; color:#FF8700}
			h4  { font-family: Helvetica, Arial, Verdana, sans-serif; font-size: 12pt; font-weight:normal; font-weight:bold; color: #666; }

			body  	{font-family: Helvetica, Arial, sans-serif; font-size: 9pt; color:#333333; line-height:1.8}
			th      {font-family: Helvetica, Arial, sans-serif; font-size: 9pt; font-weight: bold;}
			td    	{font-family: Helvetica, Arial, sans-serif; font-size: 9pt; color:#333333;}
			form  	{font-family: Helvetica, Arial, sans-serif; font-size: 9pt}
			pre   	{font-family: Courier New, Courier; font-size: 8pt}
			h1   	{font-family: Helvetica, Arial, Verdana, sans-serif; font-size: 14px; font-weight:bold; color:#0E207F;line-height:20px;}
			h2   	{font-family: Helvetica, Arial, sans-serif; font-size: 12pt; font-weight: bold}
			h3   	{font-family: Helvetica, Arial, sans-serif; font-size: 12pt; color:#FF8700}
			h4   	{font-family: Helvetica, Arial, sans-serif; font-size: 12pt;}
				.text_link  {font-family: Helvetica, Arial, sans-serif; font-size: 9pt; text-decoration:none; color:blue}
				.text_linkstate {font-family: Helvetica, Arial, sans-serif; font-size: 9pt; text-decoration:none; color:#0E207F}
				.text_link:hover   {font-family: Helvetica, Arial, sans-serif; font-size: 9pt; text-decoration:none; color:#DC842F}
				.SecondNav_link  {font-family: Helvetica, Arial, sans-serif; font-size: 9pt; font-weight:bold; color:#FFFFFF}
				.SecondNav_linkstate {font-family: Helvetica, Arial, sans-serif; font-size: 9pt; font-weight:bold; color:#DC842F}
				.SecondNav_link:hover   {font-family: Helvetica, Arial, sans-serif; font-size: 9pt; font-weight:bold; color:#DC842F}



				.inactive_text  {font-family: Helvetica, Arial, sans-serif; font-size: 9pt; text-decoration:none; color:#AAAAAA}


				.TopNavlink {
					font-family: Arial, Helvetica, Verdana, sans-serif;
					font-size:12px;
					color:#ffffff;
					text-decoration:none;
					line-height:20px;
					letter-spacing:1px;
					font-weight:normal}
				.TopNavlink:hover {color: #D99B67;}
				.TopNavlinkstate {cursor: pointer; font-family:verdana, arial, helvetica, "sans serif"; font-size:12px; letter-spacing:1px; color:#f3f1e4;}

				.speaker_link {
					font-family: Arial, Helvetica, Verdana, sans-serif;
					font-size:13px;
					color:#000000;
					line-height:20px;
					font-weight:normal}
				.speaker_link:hover {color: #000000;}
				.speaker_linkstate {cursor: pointer; font-family:verdana,arial,helvetica,sans serif; font-size:13px; color:#000000;}

				.TrailNav {
					font-family: Arial, Helvetica, Verdana, sans-serif;
					font-size:10px;
					color:#827975;
					text-decoration:none;
					line-height:20px;
					letter-spacing:.5px;
					font-weight:normal}

				.SecondNavTitle {
					font-family: Arial, Helvetica, Verdana, sans-serif;
					font-size:14px;
					color:#827975;
					font-variant:small-caps;
					text-decoration:none;
					line-height:14px;
					white-space:nowrap;
					font-weight:bold}

				.SecondNavTitle:hover {color: #827975;}
				.SecondNavTitlestate {cursor:pointer; font-family:verdana,arial,helvetica,sans serif; font-size:13px; text-decoration:none; color:#827975;}

				.SecondNavOn {
					font-family: Arial, Helvetica, Verdana, sans-serif;
					font-size:13px;
					color:#B35F3E;
					font-variant: small-caps;
					text-decoration:none;
					line-height:13px;
					letter-spacing:.5px;
					font-weight:bold}

				.SecondNavOff {
					font-family: Arial, Helvetica, Verdana, sans-serif;
					font-size:13px;
					color:#827975;
					font-variant: small-caps;
					text-decoration:none;
					line-height:13px;
					letter-spacing:.5px;
					font-weight:bold}

				.SecondNav2Off { font-family: Arial, Helvetica, Verdana, sans-serif; font-size:11px; color:#827975; font-weight: 600; text-decoration:none; line-height:13px; letter-spacing:0.5px; }
				.SecondNav2On {
					font-family: Arial, Helvetica, Verdana, sans-serif;
					font-weight: normal;
					font-size: 11px;
					color:#B35F3E;
					text-decoration:none;
					line-height:13px;
					letter-spacing:.5px;}

				.PageTitle {
					font-family: Arial, Helvetica, Verdana, sans-serif;
					font-size:14px;
					color:#827975;
					font-variant: small-caps;
					text-decoration:none;
					line-height:14px;
					letter-spacing:0.5px;
					font-weight:bold}

				.texttitle {
					font-family: Arial, Helvetica, Verdana, sans-serif;
					font-size:12px;
					color:#B35F3E;
					line-height:16px;
					letter-spacing:.5px;
					font-weight:normal;
					font-weight:bold}
				.texttitle:hover {color: #B35F3E;}
				.texttitlestate {cursor: pointer; font-family:verdana,arial,helvetica,sans serif; font-size:12px; letter-spacing:.5px; font-weight:bold; color:#B35F3E;}

				.text {
					font-family: Arial, Helvetica, Verdana, sans-serif;
					font-size:12px;
					color:#555555;
					line-height:16px;
					letter-spacing:.5px;
					font-weight:normal}


				.justifiedtext {
					font-family: Arial, Helvetica, Verdana, sans-serif;
					font-size:12px;
					color:#555555;
					line-height:16px;
					text-align:justify;
					letter-spacing:.5px;
					font-weight:normal}


				.textsm {
					font-family: Arial, Helvetica, Verdana, sans-serif;
					font-size:11px;
					color:#555555;
					line-height:13px;
					letter-spacing:.5px;
					font-weight:normal}
				.textsm:hover {color: #B35F3E;}
				.textsmstate {cursor: pointer; font-family:verdana,arial,helvetica,sans serif; font-size:11px; letter-spacing:.5px; color:#F3F1E4;}

				.top {
					font-family: Arial, Helvetica, Verdana, sans-serif;
					font-size:11px;
					color:#B35F3E;
					line-height:16px;
					font-variant: small-caps;
					text-decoration:none;
					letter-spacing:.5px;
					font-weight:normal;
					font-weight:bold}
				.top:hover {color: #B35F3E;}
				.topstate {cursor: pointer; font-family:verdana,arial,helvetica,sans serif; font-size:11px; letter-spacing:.5px; text-decoration:none; font-variant: small-caps; font-weight:bold; color:#B35F3E;}


				.RL {
					font-family: Arial, Helvetica, Verdana, sans-serif;
					font-size:11px;
					color:#294A93;
					line-height:14px;
					text-decoration:none;
					letter-spacing:.5px;
					font-weight:normal}
				.RL:hover {color: #B35F3E;}
				.RLstate {cursor: pointer; font-family:verdana,arial,helvetica,sans serif; font-size:11px; text-decoration:none; font-weight:bold; letter-spacing:.5px; text-decoration:none; color:#294A93;}


				.RelatedLinksTitle {
					font-family: Arial, Helvetica, Verdana, sans-serif;
					font-size:13px;
					color:#827975;
					font-variant: small-caps;
					text-decoration:none;
					line-height:13px;
					letter-spacing:.5px;
					font-weight:bold}

				.RelatedLinks {
					font-family: Arial, Helvetica, Verdana, sans-serif;
					font-size:11px;
					color:#294A93;
					text-decoration:none;
					letter-spacing:.5px;
					font-weight:bold}
				.RelatedLinks:hover {color: #B35F3E;}
				.RelatedLinksstate {cursor: pointer; font-family:verdana,arial,helvetica,sans serif; font-size:11px; font-weight:bold; letter-spacing:.5px; text-decoration:none; color:#294A93;}

				.BottomNav {
					font-family: Arial, Helvetica, Verdana, sans-serif;
					font-size:9px;
					color:#fff;
					text-decoration:none;
					font-variant: small-caps;
					line-height:14px;
					letter-spacing:0.5px;
					font-weight:normal}
				.BottomNav:hover {color: #c2c2c2;}
				.BottomNavstate {cursor: pointer; font-family:verdana, arial, helvetica, "sans serif"; font-size:9px; font-variant: small-caps; letter-spacing:0.5px; color:#c28962;}

				.copyright {
					font-family: Verdana, Helvetica, Arial, sans-serif;
					font-size:9px;
					color:#fff}

				.textform {
					color: #000000;
					font-family: Verdana, Arial, Helvetica, sans-serif;
					font-size: 10px;
					text-align: center;}

				.PressTitle {
					font-family: Arial, Helvetica, Verdana, sans-serif;
					font-size:13px;
					color:#555555;
					line-height:16px;
					letter-spacing:.5px;
					font-weight:bold}

				.PressLink {
					font-family: Arial, Helvetica, Verdana, sans-serif;
					font-size:11px;
					color:#294A93;
					text-decoration:none;
					line-height:normal;
					letter-spacing:.2px;
					font-weight:normal}
				.PressLink:hover {color: #B35F3E;}
				.PressLinkstate {cursor: pointer; font-family:verdana,arial,helvetica,sans serif; text-decoration:none; font-size:11px; font-weight:normal; letter-spacing:.5px; color:#F3F1E4;}

				.PressHeadline_inside {
					font-family: Arial, Helvetica, Verdana, sans-serif;
					font-size:14px;
					color:#294A93;
					text-decoration:none;
					line-height:14px;
					letter-spacing:.5px;
					font-weight:bold}

				.ACWhiteTitle {
					font-family: Arial, Helvetica, Verdana, sans-serif;
					font-size:12px;
					color:#FFFFFF;
					text-decoration:none;
					line-height:13px;
					letter-spacing:.1px;
				}

				.table{
					background-color: #FFFFFF;
					border-color: #827975;
					border-width: 1px 1px 1px 1px;
					border-style: solid;
					margin-bottom: 8px
				}

				.speclibtable{
					padding: 4;
					background-color: #f3f1e4;
					border-color: #c6c1b8;
					border-width: 1px 1px 1px 1px;
					border-style: solid;
					border-collapse: collapse;
					margin-bottom: 8px
				}

				.exporttable{
					padding: 4;
					background-color: #f3f1e4;
					border-color: #c6c1b8;
					border-width: 1px 1px 1px 1px;
					border-style: solid;
					border-collapse: collapse;
					margin-bottom: 8px;
					white-space:nowrap
				}


				.brown {
					font-family: Arial, Helvetica, Verdana, sans-serif;
					font-size:12px;
					color:#946000;
					line-height:16px;
					letter-spacing:.5px;
					text-decoration:none;
					font-weight:normal}

				.black {
					font-family: Arial, Helvetica, Verdana, sans-serif;
					font-size:12px;
					color:#000000;
					line-height:16px;
					letter-spacing:.5px;
					text-decoration:none;
					font-weight:normal}

				.form {
					font-family: Verdana, Arial, Helvetica, Verdana, sans-serif;
					font-size:11px;
					color:#555555;}

				.bullets {
					font-family: Arial, Helvetica, Verdana, sans-serif;
					font-size:12px;
					color:#004896;
					line-height:16px;
					letter-spacing:.5px;
					font-weight:normal}


			body.rep
			{
				font-family: Arial, Helvetica, Verdana, sans-serif;
				font-weight: normal;
			}
			p.rep
			{
				font-family: Arial, Helvetica, Verdana, sans-serif;
				text-align: justify;
				font-weight: normal;
				color:#555555;
			}

			table.rep
			{
				font-family: Arial, Helvetica, Verdana, sans-serif;
				width: 100%;
				border: 2px solid black;
				border-width: 1px;
				border-spacing: 1px;
			}
			table.faq
			{
				font-family: Arial, Helvetica, Verdana, sans-serif;
				width: 100%;
				border-width: 1px;
				border-spacing: 1px;
				text-align: left;
			}
			table.rep2
			{
				font-family: Arial, Helvetica, Verdana, sans-serif;
				width: 50%;
				border: 2px solid black;
				border-width: 1px;
				border-spacing: 1px;
			}
			th.rep
			{
				font-family: Arial, Helvetica, Verdana, sans-serif;
				font-weight: bold;
				background: #EEBB77;
				width: 100%;
				border: 1px solid black;
			}
			td.rep
			{
				font-family: Arial, Helvetica, Verdana, sans-serif;
				border: 1px solid black;
			}
			th.rep2
			{
				font-family: Arial, Helvetica, Verdana, sans-serif;
				font-weight: bold;
				background: #EEBB77;
				border: 1px solid grey;
			}
			td.rep2
			{
				font-family: Arial, Helvetica, Verdana, sans-serif;
				border: 1px solid grey;
				padding: 3px;
			}
			p.faq
			{
				font-family: Arial, Helvetica, Verdana, sans-serif;
				font-weight: normal;
				text-align: justify;
				color: black;
			}
			ul.faq
			{
				font-family: Arial, Helvetica, Verdana, sans-serif;
				font-weight: normal;
				color: #333300;
			}


				.pseudo_link    {  font-family: Helvetica, Arial, sans-serif; font-size: 9pt; text-decoration:none; color: blue; CURSOR: help;}
				.white_bg{background-color: #FFFFFF }
				.grey_bg{ background-color: #CCCCCC }
				.med_gray_bg{ background-color: #CCCCCC; font-size: 12pt; font-weight: bold; Padding:2}
				.grey_header{ font-family: Helvetica, Arial, sans-serif; color: #000000; font-size: 14pt; background-color: #CCCCCC; font-weight: bold; padding:1 2}
				.rev_gray{background-color: #555555; font-size: 9pt; font-weight: bold; color:white; line-height: 25px;}
				.rev_gray_head{background-color: #888888; font-size: 9pt; font-weight: bold; color:white; line-height: 25px;}
				.blue_bg{ font-family: Helvetica, Arial, sans-serif; background-color: #4455cc; font-size: 14pt; font-weight: bold; color: white}
				.pa_predicted_pep{ background-color: lightcyan; font-size: 9pt; font-family:courier; letter-spacing:0.5;	border-style: solid; border-width: 0.1px; border-color: black }
				.pa_glycosite{ background-color: #ee9999; border-style: solid; font-size: 9pt; font-family:courier; border-width: 0px; letter-spacing:0.5 }
				.spaced_text { line-height: 1.2em; }
				.spaced_text SUB, .spaced SUP { line-height: 1; }
				.aa_mod { vertical-align: top; font-size: 9pt; color: darkslategray }
				.pa_sequence_font{font-family:courier; font-size: 9pt;  letter-spacing:0.5; font-weight: bold; }
				.pa_observed_sequence{font-family:courier; font-size: 9pt; color: red;  letter-spacing:0.5; font-weight: bold;}
				.disclaimer { background-color: #FFFFDD; font-style: italic; }
				.PA_info_box {border: 3px double #cccccc; background-color: #f0f8ff; padding: 5px;}

				.clippy{margin-top:-3px;position:relative;top:2px;}
				.btn{ border:none; transition-duration: 0.4s; }
				.btn:hover{ background-color: white }

			-->

				</style>


				<!-- Full page table -->

				<body>    <style type="text/css">
				.sortarrow { font-size: 12pt; font-weight: bold }
				.sortheader{ font-size: 9pt; font-weight: bold; color:white; }
				.sortheader th   { font-weight: bold; padding: 5px 12px; }
				.info_box { background: #F0F0F0; border: #000 1px solid; padding: 4px; width: 80%; color: #444444 }
				.small_super_text { vertical-align: super; font-size: 8pt }
				.clear_info_box { border: #000 1px solid; padding: 4px; width: 100%; color: #444444 }
				.nowrap_clear_info_box { border: #000 1px solid; padding: 4px; width: 100%; white-space: nowrap; color: #444444 }
				.clear_warning_box { border: #F03 1px solid; padding: 4px; width: 80%; color: #444444 }
				.popup_help { cursor: Help; color:#444444; background-color: #E0E0E0 }
				.gaggle-data { display: none }
				.bold_text { font-weight: bold; white-space: nowrap }
				.nowrap_text { white-space: nowrap }
			a.dataheader { font-weight: bold; text-decoration:none; }
			a.dataheader:hover { color:b00; }
				.dataheader { font-weight: bold; color:white }

			/* Style info below organized by originating module
			/* Peptide Atlas */
				.cellblock_top { border-top:thin solid; border-color:black; border-left:thin solid; border-right:thin solid}
				.cellblock_bottom { border-bottom:thin solid; border-color:black; border-left:thin solid; border-right:thin solid}
				.cellblock { border-color:black; border-left:thin solid; border-right:thin solid}
				.small_form_field {    font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 8pt; color: #000000; background-color: #FFFFCC; padding: 1px; height: 16px; border: 1px solid #7F9DB9 }  
				.small_form_text {    font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 8pt; }
				.small_form_caption {    font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 8pt; font-weight: bold; }
				.pseudo_link    {  font-family: Helvetica, Arial, sans-serif; font-size: 9pt; text-decoration:none; color: blue; CURSOR: help;}
				.white_bg{background-color: #FFFFFF }
				.grey_bg{ background-color: #CCCCCC }
				.bold_italic_text{font-weight:bold;font-style:italic}
				.bold_red_italic_text{font-weight:bold;font-style:italic;color:red}
				.inactive_text {color:#AAAAAA}
				.active_text {color:#000000}
				.med_gray_bg{ background-color: #CCCCCC; font-size: 12pt; font-weight: bold; Padding:2}
				.grey_header{ font-family: Helvetica, Arial, sans-serif; color: #000000; font-size: 14pt; background-color: #CCCCCC; font-weight: bold; padding:1 2}
				.section_description{ font-family: Helvetica, Arial, sans-serif; color: #666666; font-size: 14pt; font-weight: bold; padding:1}
				.rev_gray{background-color: #555555; font-size: 12pt; font-weight: bold; color:white; line-height: 25px;}
				.rev_gray_head{background-color: #888888; font-size: 9pt; font-weight: bold; color:white; line-height: 25px;}
				.blue_bg{ font-family: Helvetica, Arial, sans-serif; background-color: #4455cc; font-size: 14pt; font-weight: bold; color: white}
				.pa_predicted_pep{ background-color: lightcyan; font-size: 9pt; font-family:courier; letter-spacing:0.5;	border-style: solid; border-width: 0.1px; border-color: black }
				.spaced_text { line-height: 1.2em; }
				.spaced_text SUB, .spaced SUP { line-height: 1; }
				.aa_mod { vertical-align: top; font-size: 9; color: darkslategray }

				.pa_sequence_font{font-family:courier; font-size: 9pt;  letter-spacing:0.5; font-weight: bold; }	
				.pa_observed_sequence{font-family:courier; font-size: 9pt; color: red;  letter-spacing:0.5; font-weight: bold;}	
				.pa_sequence_counter{font-size:smaller;color:#ccc;}

				.pa_snp_font{font-family:courier; font-size: 9pt; letter-spacing:0.5; font-weight: bold; background-color: #66CCFF}	
				.pa_snp_obs_font{font-family:courier; font-size: 9pt; letter-spacing:0.5; font-weight: bold; color: #00CC00}	
				.pa_snp_medium_font{font-family:courier; font-size: 9pt; letter-spacing:0.5; font-weight: bold; color: #CCCC00}	
				.pa_snp_warn_font{font-family:courier; font-size: 9pt; letter-spacing:0.5; font-weight: bold; color: #CC0000}	

				.pa_acetylated_font{font-family:courier; font-size: 9pt; letter-spacing:0.5; font-weight: bold; background-color: #FFCC66}	
				.pa_phospho_font{font-family:courier; font-size: 9pt; letter-spacing:0.5; font-weight: bold; background-color: #009966}	
				.pa_modified_aa_font{font-family:courier; font-size: 9pt; letter-spacing:0.5; font-weight: bold; background-color: #999999}	
				.pa_glycosite{ background-color: #EE9999; border-style: solid; font-size: 9pt; font-family:courier; border-width: 0px; letter-spacing:0.5 }	

				.section_heading {  font-family: Helvetica, Arial, sans-serif; font-size: 10pt; font-weight: Bold; }
				.description { font-family: Helvetica, Arial, sans-serif; color:#333333; font-size: 9pt; font-style: italic;  }
				.help_key {  font-family: Helvetica, Arial, sans-serif; font-size: 9pt; font-weight: Bold; }
				.help_val {  font-family: Helvetica, Arial, sans-serif; font-size: 9pt; }
				.plot_caption {  font-family: Helvetica, Arial, sans-serif; font-size: 12pt; }

				.left_text { text-align: left }
				.center_text { text-align: center }
				.right_text { text-align: right }
				.header_text { color: white; text-align: left }
				.topbound_text { vertical-align: top }
				.clustal_dummy_wrap {width: 900px; overflow-x: scroll; overflow-y:hidden; height: 20px;}
				.clustal_wrap {width: 900px; overflow-x: scroll; overflow-y:hidden; height: 200px;}
				.clustal_dummy {width:1000px; height: 20px; }
				.clustalx {width:1000px; }
				.clustal {width: 1000px; overflow-x: scroll; scrollbar-arrow-color: blue; scrollbar- face-color: #e7e7e7; scrollbar-3dlight-color: #a0a0a0; scrollbar-darkshadow-color: #888888}
				.clustal_peptide {width: 1000px; height: 400px; overflow-x: scroll; overflow-y: scroll; scrollbar-arrow-color: blue; scrollbar- face-color: #e7e7e7; scrollbar-3dlight-color: #a0a0a0; scrollbar-darkshadow-color: #888888}
				.fade_header { background-image: url(/sbeams/sbeams/images/fade_orange_header_2.png); background-repeat: no-repeat }

			/* Glycopeptide */
				.blue_bg_glyco{ font-family: Helvetica, Arial, sans-serif; background-color: #4455cc; font-size: 12pt; font-weight: bold; color: white}
				.identified_pep{ background-color: #882222; font-size: 12pt; font-weight: bold; letter-spacing:0.5;	color:white; Padding:1; border-style: solid; border-left-width: 1px; border-right-width: 1px; border-top-width: 1px; border-left-color: #eeeeee; border-right-color: #eeeeee; border-top-color: #aaaaaa; border-bottom-color:#aaaaaa; }
				.predicted_pep{ background-color: #FFCC66; font-size: 12pt; font-family:courier; font-weight: bold; letter-spacing:0.5;	border-style: solid; border-width: 1px; border-right-color: blue ; border-left-color:  red ; }
				.sseq{ background-color: #CCCCFF; font-size: 12pt; font-weight: bold}
				.tmhmm{ background-color: #CCFFCC; font-size: 9pt; font-weight: bold; text-decoration:underline}
				.instruction_text{ font-size: 12pt; font-weight: bold}
				.sequence_font{font-family:courier; font-size: 12pt; font-weight: bold; letter-spacing:0.5}	
				.obs_seq_font{font-family:courier; font-size: 12pt; font-weight: bold; letter-spacing:0.5; color: red }	
				.sec_obs_seq_font{font-family:courier; font-size: 12pt; font-weight: bold; letter-spacing:0.5; color: green }	
				.obs_seq_bg_font{font-family:courier; font-size: 12pt; font-weight: bold; letter-spacing:0.5; background-color: lightskyblue }	
				.sec_obs_seq_bg_font{font-family:courier; font-size: 12pt; font-weight: bold; letter-spacing:0.5; background-color: springgreen }	

			table.freeze_table { table-layout: fixed; width: 1000px; *margin-left: -100px;/*ie7*/}
				.freeze_table td { vertical-align: top; width:100px;  }
				.freeze_table th {  position:absolute; *position: relative; /*ie7*/ left:0; width:100px;  }

			/* Phosphopep */
				.invalid_parameter_value  {  font-family: Helvetica, Arial, sans-serif; font-size: 12pt; text-decoration: none; color: #FC0; font-style: Oblique; }
				.missing_required_parameter  {  font-family: Helvetica, Arial, sans-serif; font-size: 12pt; text-decoration: none; color: #F03; font-style: Italic; }
				.section_title  {  font-family: Helvetica, Arial, sans-serif; font-size: 14pt; text-decoration: none; color: #090; font-style: Normal; }

			/* Microarray */
				.lite_blue_bg{font-family: Helvetica, Arial, sans-serif; background-color: #eeeeff; font-size: 14pt; color: #cc1111; font-weight: bold;border-style: solid; border-width: 1px; border-color: #555555 #cccccc #cccccc #555555;}
				.orange_bg{ background-color: #FFCC66; font-size: 12pt; font-weight: bold}
				.red_bg{ background-color: #882222; font-size: 12pt; font-weight: bold; color:white; Padding:2}

			td.grn_bg{ background-color: #00FF00; font-size: 9pt;}
			td.yel_bg{ background-color: #FFFF00; font-size: 9pt;}
			td.red_bg{ background-color: #FF0000; font-size: 9pt; }

				.small_cell {font-size: 8; background-color: #CCCCCC; white-space: nowrap  }
				.med_cell {font-size: 10; background-color: #CCCCCC; white-space: nowrap  }
				.anno_cell {white-space: nowrap  }
				.present_cell{border: none}
				.marginal_cell{border: 1px solid #0033CC}
				.absent_cell{border: 2px solid #660033}
				.small_text{font-family: Helvetica,Arial,sans-serif; font-size:x-small; color:#aaaaaa}
				.table_setup{border: 0px ; border-collapse: collapse;   }
				.pad_cell{padding:5px;  }
				.white_hyper_text{font-family: Helvetica,Arial,sans-serif; color:#000000;}
				.white_text    {  font-family: Helvetica, Arial, sans-serif; font-size: 9pt; text-decoration: underline; color: white; CURSOR: help;}
				.white_text_head {  font-family: Helvetica, Arial, sans-serif; font-size: 9pt; text-decoration: underline; color: white; CURSOR: help;}

			div.visible { display: inline; white-space: nowrap;         }
			div.visilink { color: blue; display: inline; white-space: nowrap;         }
			div.hidden { display: none; }
			span.visible { display: inline; white-space: nowrap;         }
			span.hidden { display: none; }
			table.tbl_visible { display: table; }
			table.tbl_hidden { display: none; }
			tr.tbl_visible { display: table-row; }
				.hoverabletitle { cursor:pointer; margin-top: 8px; background:#f3f1e4; color:#555; font-size:large; font-weight:bold; border-top:1px solid #b00; border-left:15px solid #b00; padding:0.5em}
				.hoverabletitle:hover { box-shadow:0 3px 5px 3px #aaa;}
			tr.hoverable:hover td { background:#ffad4e; }
			td.key   { border-bottom:1px solid #ddd; background:#d3d1c4;}
			td.value { border-bottom:1px solid #ddd; }
			tr.tbl_hidden { display: none; }
			td.tbl_visible { display: table-cell; }
			td.tbl_hidden { display: none; }

				</style>


				<table id="FullPage" border="0" cellpadding="0" cellspacing="0" width="100%">
				<tr><td>


				<table id="Table_01" width="100%" height="83" border="0" cellpadding="0" cellspacing="0">
				<tr bgcolor="#827975">
				<td width="100%" height="20" bgcolor="#827975">

				<a href="http://www.systemsbiology.org" target="_blank">
				<img src="/sbeams/images/isbhome.gif" width="76" height="19" alt="" align="left" border="0"></a>	
				</td>
				</tr>
				<tr>
				<td colspan="3" bgcolor="#f3f1e4" height="1">
				</td>
				</tr>
				<tr>
				<td colspan="3" bgcolor="#b06347" height="1">
				</td>
				</tr>
				<tr>
				<td colspan="3" background="/sbeams/images/bar_alternate.gif">
				<img src="/sbeams/images/clear.gif" width="100" height="1">
				<img src="/sbeams/images/pa_transparent_background1.gif" alt="PeptideAtlas"/>
				</td>
				</tr>
				<tr>
				<td bgcolor="#f3f1e4" width="110" height="1"></td>
				</tr>
				<tr>
				<td colspan="3" bgcolor="#b06347" height="1">
				</td>
				</tr>
				</table>

				<!--end top bar-->


				<!-- --------------- Navigation Bar: List of links ------------------------ -->
				<!-- START Main page table -->
				<table align="left" bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" width="100%">
				<tr>
				<td><img src="/sbeams/images/clear.gif" border="0" height="1" width="130"></td>
				<td><img src="/sbeams/images/clear.gif" border="0" height="1" width="10"></td>
				<td ><img src="/sbeams/images/clear.gif" border="0" height="1" width="570"></td>
				<td height="1" width="1"></td>
				</tr>
				<tr valign="top" height="601">
				<td height="601">



				<!-- START Secondary navigation table -->
				<table align="center" bgcolor="#f3f1e4" border="0" cellpadding="0" cellspacing="0" width="0">
				<tr height="2">
				<td bgcolor="#c6c1b8" height="2" width="1"><img src="/sbeams/images/clear.gif" border="0" height="1" width="1"></td>
				<td colspan="3" bgcolor="#c6c1b8" height="2"><img src="/sbeams/images/clear.gif" border="0" height="2" width="1"></td>
				<td bgcolor="#c6c1b8" height="2" width="1"><img src="/sbeams/images/clear.gif" border="0" height="1" width="1"></td>
				</tr>
				<tr>
				<td bgcolor="#c6c1b8" height="1" width="1"><img src="/sbeams/images/clear.gif" border="0" height="20" width="1"></td>
				<td colspan="3" class="SecondNavTitle" align="center" bgcolor="#c6c1b8" height="20"><a href="http://www.peptideatlas.org/" class="SecondNavTitle">PeptideAtlas Home</a></td>
				<td bgcolor="#c6c1b8" height="1" width="1"><img src="/sbeams/images/clear.gif" border="0" height="1" width="1"></td>
				</tr>
				<tr>
				<td bgcolor="#c6c1b8" height="1" width="1"><img src="/sbeams/images/clear.gif" border="0" height="1" width="1"></td>
				<td colspan="3" bgcolor="#bb0000" height="2"><img src="/sbeams/images/clear.gif" border="0" height="2" width="1"></td>
				<td bgcolor="#c6c1b8" height="1" width="1"><img src="/sbeams/images/clear.gif" border="0" height="1" width="1"></td>
				</tr>
				<tr>
				<td bgcolor="#c6c1b8" height="1" width="1"><img src="/sbeams/images/clear.gif" border="0" height="1" width="1"></td>
				<td><img src="/sbeams/images/clear.gif" border="0" height="1" width="5"></td>
				<td><img src="/sbeams/images/clear.gif" border="0" height="1" width="110"></td>
				<td><img src="/sbeams/images/clear.gif" border="0" height="1" width="3"></td>
				<td bgcolor="#c6c1b8" height="1" width="1"><img src="/sbeams/images/clear.gif" border="0" height="1" width="1"></td>
				</tr>

				<tr>
				<td bgcolor="#c6c1b8" height="1" width="1"><img src="/sbeams/images/clear.gif" border="0" height="1" width="1"></td>
				<td><img src="/sbeams/images/clear.gif" border="0" height="1" width="1"></td>
				<td width="130">
				&nbsp;<a href="http://www.proteomecenter.org/" class="leftnavlink">Seattle Proteome
				<br/>&nbsp;Center</a><br/>
				&nbsp;&nbsp;<br/>
				<a class="SecondNavTitle">PeptideAtlas:</a><br/>
				&nbsp;&nbsp;<a href="http://www.peptideatlas.org/overview.php" class="leftnavlink">Overview</a><br/>
				&nbsp;&nbsp;<a href="http://www.peptideatlas.org/contacts.php" class="leftnavlink">Contacts</a><br/>
				&nbsp;&nbsp;<a href="http://www.peptideatlas.org/contributors.php" class="leftnavlink">Data Contributors</a><br/>
				&nbsp;&nbsp;<a href="http://www.peptideatlas.org/publications.php" class="leftnavlink">Publications</a><br/>
				&nbsp;&nbsp;<a href="http://www.peptideatlas.org/software.php" class="leftnavlink">Software</a><br/>
				&nbsp;&nbsp;<a href="http://www.peptideatlas.org/dbschema.php" class="leftnavlink">Database Schema</a><br/>
				&nbsp;&nbsp;<a href="http://www.peptideatlas.org/feedback.php" class="leftnavlink">Feedback</a><br/>
				&nbsp;&nbsp;<a href="http://www.peptideatlas.org/public/faq.php" class="leftnavlink">FAQ</a><br/>
				<br/>

				<form method="post" action="https://db.systemsbiology.net/sbeams/cgi/PeptideAtlas/Search">
				<a class="SecondNavTitle">Atlas Data:</a><br/>
				&nbsp;&nbsp;<a href="http://www.peptideatlas.org/repository/" class="leftnavlink">Data Repository</a><br/>
				&nbsp;&nbsp;<a href="http://www.peptideatlas.org/repository/repository_public_Hs_Plasma2.php" class="leftnavlink">Human Plasma<br/><img src="/sbeams/images/clear.gif" border="0" height="1" width="6"> (Farrah, et al.)</a><br/>
				&nbsp;&nbsp;<a href="http://www.peptideatlas.org/hupo/hppp/" class="leftnavlink">HPPP Data Central</a><br/>
				&nbsp;&nbsp;<a href="http://www.peptideatlas.org/builds/" class="leftnavlink">PeptideAtlas Builds</a><br/>
				&nbsp;&nbsp;<a href="https://db.systemsbiology.net/sbeams/cgi/PeptideAtlas/Search" class="leftnavlink">Search Database</a><br/>
				&nbsp;&nbsp;<input type="text" name="search_key" value="" size="13" maxlength="60"/><input type="hidden" name="apply_action" value="GO" /><br/>
				<br/>
				&nbsp;&nbsp;<a href="http://www.peptideatlas.org/upload/" class="leftnavlink">Contribute Data</a><br/>
				&nbsp;&nbsp;<a href="http://www.peptideatlas.org/setup_genome_browser.php" class="leftnavlink">Genome Browser<br/><img src="/sbeams/images/clear.gif" border="0" height="1" width="6"> Setup</a><br/>
				</form>
				<br/>


				<a class="SecondNavTitle">Related:</a><br/>
				&nbsp;&nbsp;<a href="http://www.srmatlas.org/" class="leftnavlink" TITLE="Database of best-available SRM transitions for the complete proteomes of a few species">SRMAtlas</a><br/>
				&nbsp;&nbsp;<a href="http://www.peptideatlas.org/passel/" class="leftnavlink" TITLE="Repository specifically for SRM experimental data">PASSEL</a><br/>
				&nbsp;&nbsp;<a href="http://www.phosphopep.org/" class="leftnavlink" TITLE="Database of phospho-enriched samples from four target organisms">Phosphopep</a><br/>
				&nbsp;&nbsp;<a href="http://www.unipep.org/" class="leftnavlink" TITLE="Database of N-linked glycocapture experments">Unipep</a><br/>
				&nbsp;&nbsp;<a href="http://informatics.systemsbiology.net/informatics/mspecLINE" class="leftnavlink" TITLE="This tool displays proteins and peptides from PeptideAtlas that may be associated with a disease of interest">mspecLINE</a><br/>
				<br/>

				<a class="SecondNavTitle">Spectral Libs:</a><br/>
				&nbsp;&nbsp;<a href="http://www.peptideatlas.org/speclib/" class="leftnavlink">Libraries + Info</a><br/>
				&nbsp;&nbsp;<a href="http://www.peptideatlas.org/spectrast/" class="leftnavlink">SpectraST Search</a><br/>
				<br/><br/>

				<a class="SecondNavTitle">Glossary/Terms:</a><br/>
				&nbsp;&nbsp;<a href="http://www.peptideatlas.org/docs/PA_terms.php" class="leftnavlink">Atlas nomenclature</a><br/>
				&nbsp;&nbsp;<a href="http://www.peptideatlas.org/docs/SGD_terms.php" class="leftnavlink">SGD nomenclature</a><br/>
				&nbsp;&nbsp;<a href="http://www.peptideatlas.org/docs/protein_ident_terms.php" class="leftnavlink">Protein ID terms</a><br/>
				<br/>
				&nbsp;&nbsp;<!-- LOGIN_LINK --><br/>
				&nbsp;&nbsp;<A HREF="https://db.systemsbiology.net/sbeams/cgi/PeptideAtlas/ShowObservedSpectrum?USI=mzspec%3APXD000561%3AAdult_Frontalcortex_bRP_Elite_85_f09%3Ascan%3A17555%3AVLHPLEGAVVIIFK%2F2;force_login=yes" TITLE="Users with Peptide Atlas accounts can login to see more atlas builds">LOGIN</A>      <br/>

				</td>
				<td><img src="/sbeams/images/clear.gif" border="0" height="1" width="3"></td>
				<td bgcolor="#c6c1b8" height="1" width="1"><img src="/sbeams/images/clear.gif" border="0" height="1" width="1"></td>
				</tr>


				<tr>
				<td bgcolor="#c6c1b8" height="1" width="1"><img src="/sbeams/images/clear.gif" border="0" height="1" width="1"></td>
				<td><img src="/sbeams/images/clear.gif" border="0" height="1" width="1"></td>
				<td height="5"><img src="/sbeams/images/clear.gif" border="0" height="5" width="1"></td>
				<td><img src="/sbeams/images/clear.gif" border="0" height="1" width="3"></td>
				<td bgcolor="#c6c1b8" height="1" width="1"><img src="/sbeams/images/clear.gif" border="0" height="1" width="1"></td>
				</tr>
				<tr>
				<td colspan="5" bgcolor="#c6c1b8" height="1"><img src="/sbeams/images/clear.gif" border="0" height="1" width="1"></td>
				</tr>
				</table>
				<!-- END Secondary navigation table --><br/>

				<center><img src="/sbeams/images/isblogo.gif" alt="" height="65" width="115" align="baseline" border="0"></center>
				</td>

				<td><img src="/sbeams/images/clear.gif" border="0" height="1" width="10"></td>
				<td  height="601">



				<SCRIPT LANGUAGE="JavaScript">
				<!--

			function refreshDocument() {
				//confirm( "apply_action ="+document.MainForm.apply_action.options[0].selected+"=");
				document.MainForm.apply_action_hidden.value = "REFRESH";
				document.MainForm.action.value = "REFRESH";
				document.MainForm.submit();
			} // end refreshDocument


			function showPassed(input_field) {
				//confirm( "input_field ="+input_field+"=");
				confirm( "selected option ="+document.forms[0].slide_id.options[document.forms[0].slide_id.selectedIndex].text+"=");
				return;
			} // end showPassed



			// -->
				</SCRIPT>
				<TABLE BORDER=0><TR><TD>
				<SCRIPT LANGUAGE="JavaScript">
				function fillInUSI(input_field) {
					exampleNumber = Math.floor((Math.random()*5))
					if ( exampleNumber == 0 ) {
						document.USIForm.USI.value = "mzspec:PXD000561:Adult_Urinarybladder_bRP_Elite_71_f14:scan:1872:FSGSSSGADR/2";
					} else if ( exampleNumber == 1 ) {
						document.USIForm.USI.value = "mzspec:PXD000865:00603_F01_P004608_B00F_A00_R1:scan:14453:SSLLDVLAAR/2";
					} else if ( exampleNumber == 2 ) {
						document.USIForm.USI.value = "mzspec:PXD002286:081213-Wittie-Phos-1A:scan:14366:MVC[Carbamidomethyl]S[Phospho]PVTVR/2";
					} else if ( exampleNumber == 3 ) {
						document.USIForm.USI.value = "mzspec:PXD001464:CL_1hRP_rep3:nativeId:1,1,2740,10:Q[Gln->pyro-Glu]IGDALPVSC[Carbamidomethyl]TISASR/2";
					} else {
						document.USIForm.USI.value = "mzspec:PXD002255:ES_XP_Ubi_97H_HCD_349:scan:9617:LAEIYVNSSFYK/2";
					}
					return;
				}
				</SCRIPT>
				<FORM NAME="USIForm" METHOD="post" action="/sbeams/cgi/PeptideAtlas/ShowObservedSpectrum">
				<font size="+1">Universal Spectrum Identifier:</font>&nbsp;&nbsp;&nbsp;<a target="_blank" href="https://github.com/HUPO-PSI/UniversalSpectrumIdentifier">(what's this?)</a>&nbsp;&nbsp;&nbsp;
					<INPUT TYPE="button" NAME="example_button" VALUE="example" onClick="fillInUSI(example_button)"><BR>
					<INPUT TYPE="text" NAME="USI" SIZE="100" VALUE="mzspec:PXD000561:Adult_Frontalcortex_bRP_Elite_85_f09:scan:17555:VLHPLEGAVVIIFK/2"></INPUT>
					<INPUT TYPE='submit' VALUE='VIEW'>
					</FORM>
					</TD></TR></TABLE>
					<H2 CLASS=section_description ALIGN=CENTER>Spectrum for VLHPLEGAVVIIFK <SUP>+2</SUP></H2>
					<h3 ID="annotations_head" style="display:none"><div ID="annotations_summary" COLSPAN="2">-- No annotations here --</div></h3>
					<!--[if IE]><script language="javascript" type="text/javascript" src="/sbeams/usr/javascript/lorikeet/js/excanvas.min.js"></script><![endif]-->
					<script type="text/javascript" src="/sbeams/usr/javascript/lorikeet/js/jquery.min.js"></script>
					<script type="text/javascript" src="/sbeams/usr/javascript/lorikeet/js/jquery-ui.min.js"></script>
					<script type="text/javascript" src="/sbeams/usr/javascript/lorikeet/js/jquery.flot.js"></script>
					<script type="text/javascript" src="/sbeams/usr/javascript/lorikeet/js/jquery.flot.selection.js"></script>
					<script type="text/javascript" src="/sbeams/usr/javascript/lorikeet/js/specview.js"></script>
					<script type="text/javascript" src="/sbeams/usr/javascript/lorikeet/js/peptide.js"></script>
					<script type="text/javascript" src="/sbeams/usr/javascript/lorikeet/js/aminoacid.js"></script>
					<script type="text/javascript" src="/sbeams/usr/javascript/lorikeet/js/ion.js"></script>
					<link REL="stylesheet" TYPE="text/css" HREF="/sbeams/usr/javascript/lorikeet/css/lorikeet.css">

					<div id="lorikeet"></div>

					<script type="text/javascript">
					$(document).ready(function () {


						$("#lorikeet").specview({"sequence":"VLHPLEGAVVIIFK",
							"scanNum":17555,
							"charge":2,
							"massError":0.5,
							"peakDetect":true,
							"showMassErrorPlot":true,
							"massErrorPlotDefaultUnit":"ppm",
							"precursorMz":767.9700,
							"fileName":"mzspec:PXD000561:Adult_Frontalcortex_bRP_Elite_85_f09:scan:17555:VLHPLEGAVVIIFK/2",
							"width": 650,
							"height":400,
							"showA":[1,1,0],
							"showB":[1,1,0],
							"showC":[0,0,0],
							"showX":[0,0,0],
							"showY":[1,1,0],
							"showZ":[0,0,0],
							"peakDetect":true,
							"labelReporters":true,
							"variableMods":[  ],
							"ntermMod":0,
							"ctermMod":0,
							"selWinLow":0,

							"selWinHigh":0,
							"ms1scanLabel":"",
							"ms1peaks":ms1peaks,
							"zoomMs1":"true",
							"peaks":ms2peaks,
						});
					});
					var ms2peaks = [
						[110.0712,39316.4648],
						[111.0682,319.6931],
						[111.0745,1509.0269],
						[111.2657,104.0572],
						[112.0870,260.0960],
						[115.0866,118.6720],
						[116.4979,110.9478],
						[118.0746,101.2496],
						[118.2988,101.2590],
						[120.0808,6359.8389],
						[122.0714,1284.5668],
						[122.6864,95.4783],
						[125.0711,125.5642],
						[126.6215,112.6832],
						[127.0864,228.3010],
						[129.1023,6594.9321],
						[130.0651,227.9772],
						[130.0863,3924.0146],
						[130.1059,305.3385],
						[131.1331,125.9082],
						[132.0811,141.5993],
						[136.0758,1072.3180],
						[137.0790,116.7234],
						[138.0663,1404.3833],
						[139.6397,105.2383],
						[141.1024,765.8214],
						[143.1180,251.5857],
						[147.1130,9094.4053],
						[148.1164,378.7268],
						[148.1478,104.1158],
						[149.6271,103.6850],
						[150.0661,138.9843],
						[154.0614,514.3124],
						[155.0816,543.6497],
						[155.5276,109.6485],
						[156.0772,361.8795],
						[157.1338,276.4479],
						[158.0924,242.0316],
						[159.0919,418.8405],
						[164.1183,253.6156],
						[166.0611,1123.4303],
						[166.9362,117.5856],
						[167.0817,204.4872],
						[169.0973,554.6865],
						[169.1337,300.2340],
						[171.1131,278.2398],
						[171.1496,275.7863],
						[172.0715,125.0298],
						[173.0924,199.8933],
						[173.1287,374.8813],
						[173.3859,101.4527],
						[175.1191,1257.2502],
						[178.1343,142.4060],
						[179.9890,106.5546],
						[180.0238,114.7013],
						[183.1131,218.6261],
						[183.1493,4397.6509],
						[184.1528,405.3073],
						[185.1650,3312.4016],
						[186.0874,238.9500],
						[186.1235,310.5552],
						[186.1687,206.1930],
						[186.4963,102.2776],
						[187.0712,116.5658],
						[187.1078,456.8996],
						[198.1243,196.6487],
						[199.1445,178.6750],
						[199.1808,731.0250],
						[201.0873,227.4837],
						[201.1238,379.5022],
						[204.1344,2202.5247],
						[207.1607,141.6021],
						[211.1443,3557.8359],
						[212.1479,370.4301],
						[212.1762,346.5094],
						[213.1599,1676.4347],
						[214.1189,248.6954],
						[214.1634,203.0692],
						[215.1030,345.7082],
						[215.1392,394.5911],
						[216.0979,354.0423],
						[216.1346,222.9431],
						[223.1081,142.5386],
						[223.1554,1118.6639],
						[225.1599,113.9492],
						[226.1188,927.0436],
						[227.1028,190.7361],
						[227.1757,998.5619],
						[228.1343,1051.1970],
						[228.1706,376.5295],
						[229.1552,320.4536],
						[231.1490,218.6695],
						[233.1402,292.5977],
						[233.1649,2131.3838],
						[234.1242,1253.2661],
						[234.1685,136.3624],
						[235.1191,4772.2930],
						[235.1557,270.5096],
						[236.1034,197.5084],
						[236.1236,472.8692],
						[238.1185,242.3526],
						[240.1346,337.1197],
						[242.1501,232.5903],
						[243.1341,432.3115],
						[245.1301,196.0993],
						[247.1199,518.6516],
						[249.1601,151.9533],
						[251.1505,3603.9563],
						[252.1545,267.5753],
						[253.9947,112.6116],
						[256.0928,442.8451],
						[256.1445,261.4001],
						[258.1089,772.4817],
						[258.1448,790.1485],
						[259.1453,313.4315],
						[260.1966,136.8201],
						[261.1348,190.2426],
						[261.1568,1830.7739],
						[262.1629,203.8783],
						[263.1143,454.3298],
						[265.1000,255.2306],
						[270.1812,303.7797],
						[271.1290,123.9680],
						[274.1183,581.8991],
						[275.1717,245.8112],
						[276.1339,207.9991],
						[276.1559,530.8801],
						[276.1709,2046.7137],
						[277.1557,587.6407],
						[277.1745,255.0516],
						[277.2028,224.4776],
						[279.0977,311.2432],
						[279.1454,3120.3059],
						[280.1494,149.5194],
						[282.1458,152.3463],
						[282.7924,122.4265],
						[284.1027,239.6107],
						[284.1393,857.1761],
						[284.1602,147.6379],
						[286.1389,194.6283],
						[287.2404,115.3910],
						[288.2029,131.9608],
						[289.2028,298.1913],
						[289.7665,132.0524],
						[293.1132,208.3814],
						[294.1815,17224.4941],
						[295.1850,1985.1188],
						[297.1558,231.3027],
						[299.2083,289.4427],
						[300.1556,350.2489],
						[301.1873,2486.4546],
						[302.1138,1155.8860],
						[302.1911,348.2251],
						[304.1632,391.3685],
						[304.2131,300.2638],
						[305.1971,157.1546],
						[306.2291,4396.7490],
						[306.5656,124.7649],
						[307.1413,132.5910],
						[307.2321,325.4116],
						[310.1400,125.9638],
						[310.1765,193.2789],
						[310.2128,334.1532],
						[311.1708,575.7974],
						[311.2076,132.7452],
						[312.1555,154.3253],
						[312.1748,226.6844],
						[312.1922,567.3126],
						[312.2281,1137.1409],
						[313.1867,777.8809],
						[321.6864,116.0779],
						[322.0862,820.9703],
						[322.1218,205.1555],
						[322.2238,839.2945],
						[325.1891,193.9871],
						[326.1718,362.9204],
						[326.2441,885.8696],
						[327.2030,2662.8694],
						[328.2067,320.3232],
						[329.1818,622.8419],
						[330.1302,1059.1182],
						[330.1671,563.6608],
						[330.1928,1630.9707],
						[330.6638,109.5154],
						[331.1956,220.5327],
						[332.2085,9395.3770],
						[333.2116,1060.8099],
						[334.1728,135.4126],
						[337.1512,137.4395],
						[339.1662,658.4216],
						[339.2031,265.1839],
						[340.1867,5055.8462],
						[341.1920,604.9133],
						[341.2180,445.6227],
						[342.1312,134.5677],
						[343.1954,132.4654],
						[345.1577,120.9302],
						[345.1910,258.2612],
						[347.1922,281.7817],
						[348.2053,569.5991],
						[350.2189,43087.1680],
						[351.2223,6235.7500],
						[352.1332,262.3874],
						[352.2233,132.6326],
						[352.6896,289.2188],
						[353.1822,173.6459],
						[355.1618,211.5698],
						[357.1767,2073.1772],
						[358.2088,6572.7993],
						[359.2128,763.7015],
						[361.1887,122.0812],
						[362.2032,123.2316],
						[367.1789,132.4701],
						[368.1923,145.4664],
						[370.1862,252.7653],
						[371.1929,677.4319],
						[373.1506,749.2195],
						[373.1874,247.7788],
						[374.2441,140.2703],
						[375.1765,260.0121],
						[376.1983,1138.2255],
						[381.2132,238.1909],
						[383.1722,189.3491],
						[383.2661,533.5781],
						[393.1598,407.3627],
						[393.2186,261.1587],
						[395.2656,289.3680],
						[397.2079,2056.1785],
						[398.1825,1854.3260],
						[398.2107,366.1880],
						[399.1859,444.3095],
						[402.2242,623.7006],
						[403.5387,115.5638],
						[407.2654,6313.0786],
						[408.1396,126.5838],
						[408.2296,119.9287],
						[408.2681,1062.1289],
						[409.0220,112.1696],
						[409.1706,127.0583],
						[409.2075,227.8922],
						[409.2310,741.0212],
						[409.7320,344.2492],
						[410.2379,209.8810],
						[410.6465,111.3487],
						[411.2247,201.8582],
						[412.2558,125.4573],
						[412.2934,479.3273],
						[413.2176,114.0498],
						[414.2358,286.4678],
						[421.1538,916.0103],
						[422.1568,212.4588],
						[422.1940,140.0387],
						[422.2396,340.5821],
						[423.2043,226.4378],
						[423.2270,132.3563],
						[424.1994,129.3749],
						[425.2405,732.4388],
						[425.3118,398.0255],
						[426.2392,175.8441],
						[426.8474,124.7392],
						[427.2378,183.9859],
						[428.2496,328.2409],
						[431.2363,244.5686],
						[432.3002,134.0068],
						[436.2211,121.0368],
						[438.2352,825.7040],
						[439.2176,721.1670],
						[439.2552,267.4046],
						[440.2505,2474.2932],
						[440.2863,3030.0745],
						[441.2534,630.7215],
						[441.2867,503.6770],
						[442.2670,563.4763],
						[444.7689,439.6402],
						[446.2608,178.8316],
						[447.2710,648.1718],
						[448.2546,221.9174],
						[449.1847,302.8167],
						[449.7603,342.3545],
						[450.2345,419.4104],
						[453.2704,364.4444],
						[454.3020,429.6109],
						[456.2456,2579.4314],
						[457.2481,241.9023],
						[458.7661,1757.5543],
						[459.2348,308.6078],
						[459.2674,761.5398],
						[465.1973,207.4612],
						[468.2455,9502.1035],
						[469.2189,1041.2599],
						[469.2485,1698.3070],
						[470.1371,122.5039],
						[470.2235,234.2171],
						[470.2600,871.9168],
						[471.2640,306.8452],
						[471.4694,135.6103],
						[473.3125,333.9515],
						[477.2459,572.1246],
						[486.2329,132.0955],
						[487.2549,143.7416],
						[490.3924,130.9018],
						[494.2038,120.5008],
						[494.2510,142.6696],
						[494.3009,252.9222],
						[496.3486,231.1627],
						[498.2929,226.8608],
						[505.2780,601.1686],
						[506.2050,204.5852],
						[508.3009,997.9510],
						[508.8021,215.1254],
						[511.2648,141.6832],
						[511.3229,222.7030],
						[515.2706,232.6215],
						[515.7448,595.9976],
						[515.8110,116.7116],
						[520.3493,4453.4814],
						[521.3107,230.8691],
						[521.3536,997.4742],
						[522.2930,205.9480],
						[524.3059,727.5470],
						[525.3093,286.5024],
						[525.3750,319.6812],
						[526.2654,203.7845],
						[527.1820,110.1084],
						[530.3300,145.9819],
						[532.3590,591.6121],
						[534.2386,283.6160],
						[534.2702,411.5855],
						[537.3403,187.8210],
						[539.3188,4442.9209],
						[540.3232,776.4139],
						[541.3353,614.5037],
						[542.3361,331.2442],
						[547.2171,146.7969],
						[549.3030,916.0663],
						[550.3091,149.1510],
						[551.3191,417.3682],
						[553.2968,261.1588],
						[553.3708,1116.8035],
						[554.2468,570.1741],
						[554.3748,214.8974],
						[560.3547,1077.0436],
						[561.3579,346.4797],
						[562.2690,2011.0898],
						[563.2737,365.2514],
						[564.2466,258.7958],
						[567.3138,16119.3857],
						[568.3171,3800.3003],
						[569.3294,3258.2563],
						[570.3339,672.5203],
						[571.2690,303.9917],
						[577.3093,239.3210],
						[581.2390,144.3494],
						[581.3286,540.9548],
						[583.3454,410.2054],
						[587.2932,266.2180],
						[587.3593,221.4796],
						[588.2935,439.4879],
						[590.3318,221.2323],
						[593.3658,1894.9989],
						[593.8676,1095.2958],
						[594.3691,134.0942],
						[599.2911,576.9722],
						[605.3068,545.6956],
						[606.3057,304.4070],
						[611.3726,154.7698],
						[616.2885,266.3977],
						[617.2938,145.7147],
						[619.2922,964.9863],
						[619.4185,3126.7322],
						[620.2963,381.7613],
						[620.4194,958.3792],
						[637.3927,150.8389],
						[638.3877,3002.4377],
						[639.3892,502.4930],
						[648.3105,142.6757],
						[648.3717,708.9217],
						[652.4017,231.5236],
						[652.8903,3898.0859],
						[653.3910,2592.0540],
						[653.8941,297.7021],
						[654.4176,352.0199],
						[658.3659,230.5152],
						[661.4035,444.0853],
						[661.8950,2244.3220],
						[662.3979,1040.0021],
						[662.8958,226.8915],
						[663.3126,277.4478],
						[666.3826,16885.5176],
						[667.3854,4578.2720],
						[668.3890,299.2398],
						[676.3782,267.7315],
						[680.3981,2566.1672],
						[681.4005,673.4983],
						[682.4125,1413.6635],
						[683.4166,302.1849],
						[684.3576,149.7094],
						[686.3627,801.1750],
						[686.8438,129.7653],
						[687.3686,227.8412],
						[689.3985,1629.8489],
						[690.3592,259.2454],
						[690.4081,520.2090],
						[696.4237,203.1794],
						[704.3734,2668.9050],
						[705.3770,517.5459],
						[712.3774,511.8835],
						[712.4236,184.4843],
						[716.3995,129.9257],
						[718.4359,181.4723],
						[718.4857,1391.6587],
						[719.4893,396.1049],
						[722.8954,133.9751],
						[746.4221,903.9532],
						[747.4250,386.3142],
						[751.4713,1325.1656],
						[752.4750,494.0919],
						[757.4359,290.4567],
						[759.3774,136.5134],
						[759.8826,150.0955],
						[761.4579,712.2363],
						[767.3729,714.8173],
						[767.4279,612.5598],
						[767.8909,461.7737],
						[767.9744,223.3907],
						[768.3308,1584.0126],
						[768.3969,791.4908],
						[768.4350,209.1487],
						[772.4327,139.1219],
						[775.4491,280.6685],
						[779.4668,9947.6357],
						[780.4702,3505.5222],
						[781.4731,287.8652],
						[785.4297,1640.2041],
						[786.4332,572.6867],
						[789.4626,658.2081],
						[789.5237,529.1078],
						[793.4799,694.7182],
						[795.4964,234.3955],
						[799.3546,253.0411],
						[799.4465,300.9608],
						[803.4415,4159.5513],
						[804.4469,1108.5459],
						[805.3883,672.3317],
						[809.2540,131.9415],
						[813.4462,229.8906],
						[817.4571,6911.2046],
						[818.4602,2240.8838],
						[819.4636,234.2903],
						[825.4614,323.7793],
						[826.4654,251.0395],
						[827.4538,194.2391],
						[829.4836,198.7527],
						[830.4854,213.6909],
						[831.3987,149.6901],
						[840.4153,297.8675],
						[845.3979,636.8494],
						[846.4034,275.7665],
						[846.5461,2684.6528],
						[847.5490,1135.4121],
						[864.5541,550.8827],
						[870.5216,357.0207],
						[876.4267,360.4959],
						[877.9706,153.7785],
						[878.5369,216.1095],
						[880.4431,155.9555],
						[888.5300,1250.2761],
						[889.5317,514.1309],
						[892.5509,3268.7075],
						[893.5534,1423.8650],
						[898.5155,2302.1975],
						[899.5165,1164.9647],
						[902.4215,240.7995],
						[912.4938,827.6190],
						[913.5008,352.2354],
						[916.5259,15750.5811],
						[917.5282,6128.0435],
						[918.5333,566.1478],
						[926.5359,365.0648],
						[930.4048,234.3999],
						[957.5749,224.4288],
						[958.5882,294.7776],
						[959.4481,428.8003],
						[963.4608,593.6859],
						[975.5884,2871.6604],
						[976.5911,1553.7976],
						[977.5928,229.8053],
						[978.5058,152.1772],
						[983.6039,225.9932],
						[987.0255,131.8332],
						[987.6002,543.8097],
						[988.6046,411.2616],
						[995.4904,278.8078],
						[996.4948,227.9987],
						[997.5883,268.2237],
						[1002.4842,876.6536],
						[1003.4899,336.5846],
						[1011.5983,1531.8899],
						[1012.5975,697.5814],
						[1013.5430,1090.7047],
						[1014.5447,554.9283],
						[1015.5948,12028.3467],
						[1016.5977,6164.1328],
						[1017.5952,613.6337],
						[1029.6096,1635.2584],
						[1030.4840,988.2274],
						[1030.6084,562.9782],
						[1031.4910,425.9090],
						[1031.6217,185.2526],
						[1032.4818,232.0301],
						[1039.6178,711.4648],
						[1040.6277,327.1424],
						[1050.4901,1377.6519],
						[1051.4973,237.4681],
						[1059.5090,322.4691],
						[1060.5125,225.6759],
						[1087.5112,292.0287],
						[1088.5067,198.6422],
						[1088.6720,2132.2388],
						[1089.6760,1534.8762],
						[1092.7739,128.7805],
						[1098.6593,213.8349],
						[1100.6830,455.9431],
						[1101.6910,239.1747],
						[1107.5917,142.5115],
						[1128.6788,5089.9673],
						[1129.6798,2945.0005],
						[1130.4912,148.4881],
						[1130.6853,313.8927],
						[1142.6851,154.1701],
						[1146.2189,132.6192],
						[1149.5562,1725.0789],
						[1150.5586,1296.3828],
						[1151.5667,304.8321],
						[1158.6716,338.3654],
						[1160.6117,413.9454],
						[1161.6194,394.3770],
						[1163.5780,544.4717],
						[1167.7206,311.4904],
						[1168.7201,203.5318],
						[1176.6823,303.4505],
						[1177.5525,1103.2881],
						[1177.6803,312.6173],
						[1178.5500,757.3369],
						[1179.5555,146.1054],
						[1185.7253,13304.7637],
						[1186.7278,7922.5054],
						[1187.7351,1094.8409],
						[1206.5771,586.6654],
						[1207.5790,263.5506],
						[1222.6198,164.7063],
						[1231.6365,182.6505],
						[1234.5920,225.4897],
						[1235.5745,282.2378],
						[1241.7684,925.8685],
						[1242.7723,531.5497],
						[1288.6672,612.9485],
						[1289.6685,430.1701],
						[1322.7939,471.7474],
						[1323.7919,359.9940],
						[1385.7195,799.1681],
						[1386.7281,336.4416],
						[1440.7303,1061.1520],
						[1441.7297,1138.3184],
					];
					var ms1peaks = [[0.0,0.0]];
					</script>

					<BR>Download spectrum in Format: 
					<a href="/sbeams/cgi/GetResultSet.cgi/spec_guest_20200731-020308.tsv?rs_set_name=spec_guest_20200731-020308&format=tsv">TSV</a>,
					<a href="/sbeams/cgi/GetResultSet.cgi/spec_guest_20200731-020308.xls?rs_set_name=spec_guest_20200731-020308&format=excel">Excel</a>
					<BR><BR>

					<table width="100%" class="table_setup">
					<tr class="orange_bg"><th>Spectrum&nbsp;Analysis&nbsp;Workbench</th><td><a name="SAWB">&nbsp;</a></td></tr>
					</table>
					<table border=1><tr><td>
					<FORM METHOD="post" ACTION="/sbeams/cgi/PeptideAtlas/ShowObservedSpectrum">

					<INPUT TYPE="hidden" NAME="spectrum_identification_id" VALUE="">
					<INPUT TYPE="hidden" NAME="atlas_build_id" VALUE="">
					<INPUT TYPE="hidden" NAME="assumed_charge" VALUE="">
					<INPUT TYPE="hidden" NAME="peptide" VALUE="">
					<INPUT TYPE="hidden" NAME="USI" VALUE="mzspec:PXD000561:Adult_Frontalcortex_bRP_Elite_85_f09:scan:17555:VLHPLEGAVVIIFK/2">

					Alternate sequence: <INPUT TYPE="text" NAME="alt_sequence" SIZE="40" VALUE=""></INPUT>
					Comparison sequence: <INPUT TYPE="text" NAME="comp_sequence" SIZE="40" VALUE=""></INPUT>
					<SELECT NAME="alt_charge">
					<OPTION VALUE="1">1</OPTION>
					<OPTION SELECTED VALUE="2">2</OPTION>
					<OPTION VALUE="3">3</OPTION>
					<OPTION VALUE="4">4</OPTION>
					<OPTION VALUE="5">5</OPTION>
					</SELECT>
					<BR>
					Visual Display: <SELECT NAME="SAWB_annotation">
					<OPTION SELECTED VALUE="Lorikeet">Lorikeet default annotations</OPTION>
					<OPTION VALUE="Reannotated">Reannotated interpretations</OPTION>
					</SELECT>
					<BR>
					Text Display: <SELECT NAME="SAWB_DisplayMode">
					<OPTION VALUE="original">Original Spectrum</OPTION>
					<OPTION SELECTED VALUE="reannotatedSimple">Reannotated Spectrum - Simple</OPTION>
					<OPTION VALUE="reannotatedDifference">Reannotated difference between alt and comp</OPTION>
					<OPTION VALUE="reannotatedFull">Reannotated Spectrum - Full</OPTION>
					<OPTION VALUE="Lorikeet">Lorikeet Arrays</OPTION>
					<OPTION VALUE="denovo">Interpret spectrum de Novo</OPTION>
					</SELECT>
					<BR>
					Normalization: <SELECT NAME="SAWB_normalization">
					<OPTION VALUE="none">None</OPTION>
					<OPTION SELECTED VALUE="peakTo100">Normalize peak to 100%</OPTION>
					</SELECT>

					Minimum Intensity: <INPUT TYPE="text" NAME="SAWB_minimumIntensity" LENGTH=15 VALUE=""><BR>
					Resolution: <SELECT NAME="SAWB_resolutionHighLow">
					<OPTION SELECTED VALUE="high">High</OPTION>
					<OPTION VALUE="low">Low</OPTION>
					</SELECT>
					&nbsp;&nbsp;&nbsp;
					Fragmentation: <SELECT NAME="SAWB_fragmentation">
					<OPTION SELECTED VALUE="CID">CID</OPTION>
					<OPTION VALUE="ETD">ETD</OPTION>
					</SELECT>

					<BR>
					<INPUT TYPE='submit' VALUE='REFRESH'>
					</FORM>
					</TD></TR></TABLE>
					Content-type: text/plain

					<PRE>
					==== Spectrum Information ==================================
					Modified Peptide Sequence: VLHPLEGAVVIIFK
					Charge: 2
					PeptideIon tag: VLHPLEGAVVIIFK/2
					Residues: 14
					==== Spectrum Attributes ==================================
					precursorMz=767.9700
					rescaled=0.00232087660066217
					==== Spectrum Fragments ===================================
					110.0712     91.2  IHA/-0.7
					111.0682      0.7  ?
					111.0745      3.5  IHAi1/-1.6
					111.2657      0.2  ?
					112.0870      0.6  IRC/0.7
					115.0866      0.3  ?
					116.4979      0.3  ?
					118.0746      0.2  ?
					118.2988      0.2  ?
					120.0808     14.8  IFA/0.2
					122.0714      3.0  ?
					122.6864      0.2  ?
					125.0711      0.3  ?
					126.6215      0.3  ?
					127.0864      0.5  ?
					129.1023     15.3  IKB/0.5,y1-18/0.5
					130.0651      0.5  IWd/-0.8
					130.0863      9.1  y1-17/0.3
					130.1059      0.7  IKBi1/2.0
					131.1331      0.3  ?
					132.0811      0.3  IWe/2.3
					136.0758      2.5  IYA/0.8
					137.0790      0.3  IYAi1/-0.7
					138.0663      3.3  IHB/0.8
					139.6397      0.2  ?
					141.1024      1.8  ?
					143.1180      0.6  ia(AV)/0.8
					147.1130     21.1  y1/1.3
					148.1164      0.9  y1i1/1.3
					148.1478      0.2  ?
					149.6271      0.2  ?
					150.0661      0.3  ?
					154.0614      1.2  ?
					155.0816      1.3  ?
					155.5276      0.3  ?
					156.0772      0.8  ?
					157.1338      0.6  ia(GAV)-43/1.7
					158.0924      0.6  b3-35^2/-12.8
					159.0919      1.0  IWA/1.4
					164.1183      0.6  ia(HP)-43/0.5
					166.0611      2.6  ?
					166.9362      0.3  ?
					167.0817      0.5  ?
					169.0973      1.3  ?
					169.1337      0.7  ?
					171.1131      0.6  ib(AV)/1.7
					171.1496      0.6  ia(VV)/2.4
					172.0715      0.3  ?
					173.0924      0.5  ?
					173.1287      0.9  ?
					173.3859      0.2  ?
					175.1191      2.9  ext-y1(R)/0.6
					178.1343      0.3  ?
					179.9890      0.2  ?
					180.0238      0.3  ?
					183.1131      0.5  ia(GAV)-17/1.6
					183.1493     10.2  ia(PL)/0.6
					184.1528      0.9  ?
					185.1650      7.7  a2/0.9,ia(VI)/0.9
					186.0874      0.6  ?
					186.1235      0.7  y3-36^2/-11.9
					186.1687      0.5  a2i1/2.5
					186.4963      0.2  ?
					187.0712      0.3  ib(EG)/-0.7
					187.1078      1.1  ia(EGA)-43/0.4
					198.1243      0.5  ?
					199.1445      0.4  ib(VV)/2.0
					199.1808      1.7  ia(II)/1.6,ia(AVV)-43/1.6
					201.0873      0.5  ?
					201.1238      0.9  ?
					204.1344      5.1  y3^2/-9.2
					207.1607      0.3  ?
					211.1443      8.3  ib(PL)/0.9
					212.1479      0.9  ?
					212.1762      0.8  ?
					213.1599      3.9  b2/0.7,ib(VI)/0.7
					214.1189      0.6  ?
					214.1634      0.5  b2i1/1.2
					215.1030      0.8  ib(EGA)-43/1.7
					215.1392      0.9  ia(LE)/0.8
					216.0979      0.8  ?
					216.1346      0.5  ia(IF)-17/-17.1
					223.1081      0.3  ?
					223.1554      2.6  ia(LH)/0.3
					225.1599      0.3  ia(AVV)-17/0.6
					226.1188      2.2  ?
					227.1028      0.4  ?
					227.1757      2.3  ib(II)/1.3,ib(AVV)-43/1.3
					228.1343      2.4  ib(GAV)/0.1
					228.1706      0.9  ?
					229.1552      0.7  ia(LEG)-43/2.3
					231.1490      0.5  ?
					233.1402      0.7  ib(LH)-18/2.2
					233.1649      4.9  ia(IF)/0.3
					234.1242      2.9  ib(LH)-17/2.1
					234.1685      0.3  ?
					235.1191     11.1  ib(HP)/0.6
					235.1557      0.6  ?
					236.1034      0.5  ?
					236.1236      1.1  ?
					238.1185      0.6  ?
					240.1346      0.8  ?
					242.1501      0.5  ?
					243.1341      1.0  ib(LE)/0.7
					245.1301      0.5  ?
					247.1199      1.2  ?
					249.1601      0.4  ?
					251.1505      8.4  ib(LH)/1.0
					252.1545      0.6  ?
					253.9947      0.3  ?
					256.0928      1.0  ?
					256.1445      0.6  ?
					258.1089      1.8  ib(EGA)/1.8
					258.1448      1.8  ?
					259.1453      0.7  y2-35/4.6
					260.1966      0.3  ?
					261.1348      0.4  ?
					261.1568      4.2  ib(IF)/-11.3
					262.1629      0.5  ?
					263.1143      1.1  ?
					265.1000      0.6  ?
					270.1812      0.7  ib(AVV)/-0.1
					271.1290      0.3  ?
					274.1183      1.4  ?
					275.1717      0.6  ?
					276.1339      0.5  ?
					276.1559      1.2  ?
					276.1709      4.8  y2-18/0.9
					277.1557      1.4  y2-17/3.7
					277.1745      0.6  y2-18i1/1.6
					277.2028      0.5  ia(LHP)-43/1.9,ia(HPL)-43/1.9
					279.0977      0.7  ?
					279.1454      7.2  ?
					280.1494      0.3  ?
					282.1458      0.4  ib(LEG)-18/3.4
					282.7924      0.3  ?
					284.1027      0.6  ?
					284.1393      2.0  ?
					284.1602      0.3  ?
					286.1389      0.5  ?
					287.2404      0.3  ?
					288.2029      0.3  ?
					289.2028      0.7  ?
					289.7665      0.3  ?
					293.1132      0.5  ?
					294.1815     40.0  y2/1.0,ia(PLE)-18/1.0
					295.1850      4.6  y2i1/1.3
					297.1558      0.5  ?
					299.2083      0.7  ia(GAVV)/1.8
					300.1556      0.8  ib(LEG)/0.7
					301.1873      5.8  ?
					302.1138      2.7  ?
					302.1911      0.8  ?
					304.1632      0.9  ?
					304.2131      0.7  a3-18/-0.3
					305.1971      0.4  ib(LHP)-43/-0.3,ib(HPL)-43/-0.3,a3-17/-0.3
					306.2291     10.2  ?
					306.5656      0.3  ?
					307.1413      0.3  ?
					307.2321      0.8  ?
					310.1400      0.3  ?
					310.1765      0.4  ib(GAVV)-17/1.2
					310.2128      0.8  y5^2/0.9
					311.1708      1.3  ia(EGAV)-18/-1.9
					311.2076      0.3  ?
					312.1555      0.4  ia(EGAV)-17/0.3
					312.1748      0.5  ?
					312.1922      1.3  ia(PLE)/1.3
					312.2281      2.6  ib(VVI)/-0.2
					313.1867      1.8  ?
					321.6864      0.3  ?
					322.0862      1.9  ?
					322.1218      0.5  ?
					322.2238      1.9  a3/0.2
					325.1891      0.5  ia(LEGA)-18/6.4
					326.1718      0.8  ia(LEGA)-17/2.3
					326.2441      2.1  ib(VII)/0.9
					327.2030      6.2  ib(GAVV)/1.0
					328.2067      0.7  ?
					329.1818      1.4  ia(EGAV)/-0.4
					330.1302      2.5  ?
					330.1671      1.3  ?
					330.1928      3.8  ib(LHP)-18/1.1,ib(HPL)-18/1.1
					330.6638      0.3  ?
					331.1956      0.5  ?
					332.2085     21.8  b3-18/1.2
					333.2116      2.5  b3-18i1/0.3
					334.1728      0.3  ?
					337.1512      0.3  ?
					339.1662      1.5  ib(EGAV)-18/-0.3
					339.2031      0.6  ?
					340.1867     11.7  ib(PLE)/0.0
					341.1920      1.4  ?
					341.2180      1.0  ?
					342.1312      0.3  ?
					343.1954      0.3  ia(LEGA)/-6.4
					345.1577      0.3  ?
					345.1910      0.6  ?
					347.1922      0.7  ?
					348.2053      1.3  ib(LHP)/6.6,ib(HPL)/6.6
					350.2189    100.0  b3/0.7
					351.2223     14.5  b3i1/0.7
					352.1332      0.6  ?
					352.2233      0.3  b3i2/-6.1
					352.6896      0.7  ?
					353.1822      0.4  ib(LEGA)-18/0.7
					355.1618      0.5  ?
					357.1767      4.8  ib(EGAV)/-0.4
					358.2088     15.3  ?
					359.2128      1.8  ?
					361.1887      0.3  ?
					362.2032      0.3  ?
					367.1789      0.3  ?
					368.1923      0.3  ?
					370.1862      0.6  ?
					371.1929      1.6  ib(LEGA)/1.1
					373.1506      1.7  ?
					373.1874      0.6  ?
					374.2441      0.3  ib(IIF)/0.8
					375.1765      0.6  ?
					376.1983      2.6  ?
					381.2132      0.6  ?
					383.1722      0.4  ?
					383.2661      1.2  ib(AVVI)/2.1
					393.1598      0.9  ?
					393.2186      0.6  ?
					395.2656      0.7  ia(GAVVI)-17/0.8,y7^2/0.8
					397.2079      4.8  ib(PLEG)/-0.7
					398.1825      4.3  ?
					398.2107      0.8  ?
					399.1859      1.0  ?
					402.2242      1.4  ?
					403.5387      0.3  ?
					407.2654     14.7  y3/0.3
					408.1396      0.3  ?
					408.2296      0.3  ?
					408.2681      2.5  y3i1/-1.4
					409.0220      0.3  ?
					409.1706      0.3  ?
					409.2075      0.5  ?
					409.2310      1.7  b8^2/-2.4
					409.7320      0.8  b8^2i1/-4.1
					410.2379      0.5  ia(EGAVV)-18/-4.6,b8^2i2/6.2
					410.6465      0.3  ?
					411.2247      0.5  ia(EGAVV)-17/2.2
					412.2558      0.3  ?
					412.2934      1.1  ia(GAVVI)/3.8
					413.2176      0.3  ?
					414.2358      0.7  ?
					421.1538      2.1  ?
					422.1568      0.5  ?
					422.1940      0.3  ?
					422.2396      0.8  ia(PLEGA)-18/-0.5
					423.2043      0.5  ?
					423.2270      0.3  ia(PLEGA)-17/7.5
					424.1994      0.3  ?
					425.2405      1.7  ia(LEGAV)-17/2.4,ib(PLEGA)-43/2.4
					425.3118      0.9  ib(VVII)/-1.0
					426.2392      0.4  ?
					426.8474      0.3  ?
					427.2378      0.4  ?
					428.2496      0.8  ia(EGAVV)/-1.8
					431.2363      0.6  ia(HPLE)-18/-8.9
					432.3002      0.3  ?
					436.2211      0.3  ?
					438.2352      1.9  ib(EGAVV)-18/1.1
					439.2176      1.7  ib(EGAVV)-17/-2.6
					439.2552      0.6  ?
					440.2505      5.7  ia(PLEGA)/0.3
					440.2863      7.0  ib(GAVVI)/-1.0
					441.2534      1.5  b9-35^2/13.1
					441.2867      1.2  ?
					442.2670      1.3  ia(LEGAV)/2.2
					444.7689      1.0  a9^2/0.4
					446.2608      0.4  ?
					447.2710      1.5  b4/-1.0
					448.2546      0.5  ?
					449.1847      0.7  ?
					449.7603      0.8  b9-18^2/-1.3
					450.2345      1.0  ib(PLEGA)-18/-0.5
					453.2704      0.8  ?
					454.3020      1.0  ?
					456.2456      6.0  ib(EGAVV)/0.7
					457.2481      0.6  ?
					458.7661      4.1  b9^2/-0.2
					459.2348      0.7  ib(HPLE)-18/-0.5
					459.2674      1.8  b9^2i1/-1.0
					465.1973      0.5  ?
					468.2455     22.1  ib(PLEGA)/0.5
					469.2189      2.4  ?
					469.2485      3.9  ?
					470.1371      0.3  ?
					470.2235      0.5  ?
					470.2600      2.0  ib(LEGAV)/-2.0
					471.2640      0.7  ?
					471.4694      0.3  ?
					473.3125      0.8  ib(VIIF)/0.6
					477.2459      1.3  ib(HPLE)/0.6
					486.2329      0.3  ?
					487.2549      0.3  ?
					490.3924      0.3  ?
					494.2038      0.3  ?
					494.2510      0.3  ?
					494.3009      0.6  a10^2/-4.1
					496.3486      0.5  ib(AVVII)/-1.5
					498.2929      0.5  ?
					505.2780      1.4  ?
					506.2050      0.5  ?
					508.3009      2.3  b10^2/1.0
					508.8021      0.5  b10^2i1/0.0
					511.2648      0.3  ?
					511.3229      0.5  ?
					515.2706      0.5  ?
					515.7448      1.4  ?
					515.8110      0.3  ?
					520.3493     10.3  y4/-0.1
					521.3107      0.5  ia(PLEGAV)-18/4.8
					521.3536      2.3  y4i1/1.6
					522.2930      0.5  ia(PLEGAV)-17/1.5
					524.3059      1.7  ib(PLEGAV)-43/-3.8,ia(LEGAVV)-17/-3.8,ia(EGAVVI)-17/-3.8
					525.3093      0.7  b5-35/-17.3
					525.3750      0.7  ia(GAVVII)/-1.7
					526.2654      0.5  ?
					527.1820      0.3  ?
					530.3300      0.3  ?
					532.3590      1.4  a5/-3.0
					534.2386      0.7  ?
					534.2702      1.0  ib(HPLEG)/5.9
					537.3403      0.4  ?
					539.3188     10.3  ia(PLEGAV)/0.1
					540.3232      1.8  ?
					541.3353      1.4  ia(LEGAVV)/1.6,ia(EGAVVI)/1.6
					542.3361      0.8  a11-17^2/8.1,b5-18/-16.3
					547.2171      0.3  ?
					549.3030      2.1  ib(PLEGAV)-18/-0.2
					550.3091      0.3  ?
					551.3191      1.0  ib(LEGAVV)-18/0.6,ib(EGAVVI)-18/0.6
					553.2968      0.6  ?
					553.3708      2.6  ib(GAVVII)/-0.0
					554.2468      1.3  ?
					554.3748      0.5  ib(VVIIF)-18/8.5
					560.3547      2.5  b5/-1.4
					561.3579      0.8  b5i1/-1.8
					562.2690      4.7  ?
					563.2737      0.8  ?
					564.2466      0.6  ?
					567.3138     37.4  ib(PLEGAV)/0.2
					568.3171      8.8  ?
					569.3294      7.6  ib(LEGAVV)/0.1,ib(EGAVVI)/0.1
					570.3339      1.6  ?
					571.2690      0.7  ?
					577.3093      0.6  ia(HPLEGA)/0.1
					581.2390      0.3  ?
					581.3286      1.3  ?
					583.3454      1.0  ?
					587.2932      0.6  ib(HPLEGA)-18/-0.7
					587.3593      0.5  ?
					588.2935      1.0  ?
					590.3318      0.5  ib(LHPLE)/3.6
					593.3658      4.4  y11^2/0.1
					593.8676      2.5  y11^2i1/0.3
					594.3691      0.3  y11^2i2/-0.0
					599.2911      1.3  ?
					605.3068      1.3  ib(HPLEGA)/4.3
					606.3057      0.7  ?
					611.3726      0.4  ?
					616.2885      0.6  ?
					617.2938      0.3  ?
					619.2922      2.2  ?
					619.4185      7.3  y5/1.2
					620.2963      0.9  ?
					620.4194      2.2  y5i1/-2.8
					637.3927      0.4  ia(LEGAVVI)-17/1.2,ia(EGAVVII)-17/1.2
					638.3877      7.0  ia(PLEGAVV)/0.8
					639.3892      1.2  ?
					648.3105      0.3  ?
					648.3717      1.6  ib(PLEGAVV)-18/0.3
					652.4017      0.5  ?
					652.8903      9.0  y12-18^2/0.6
					653.3910      6.0  y12-18^2i1/-0.9
					653.8941      0.7  y12-18^2i2/1.2
					654.4176      0.8  ia(LEGAVVI)/-1.4,ia(EGAVVII)/-1.4
					658.3659      0.5  ia(HPLEGAV)-18/-1.9
					661.4035      1.0  a6/0.5
					661.8950      5.2  y12^2/-0.3
					662.3979      2.4  y12^2i1/1.5
					662.8958      0.5  y12^2i2/-4.2
					663.3126      0.6  ?
					666.3826     39.2  ib(PLEGAVV)/0.7
					667.3854     10.6  ?
					668.3890      0.7  ?
					676.3782      0.6  ia(HPLEGAV)/0.8
					680.3981      6.0  ?
					681.4005      1.6  ?
					682.4125      3.3  ib(LEGAVVI)/-1.3,ib(EGAVVII)/-1.3
					683.4166      0.7  ib(GAVVIIF)-17/5.7
					684.3576      0.3  ?
					686.3627      1.9  ib(HPLEGAV)-18/1.0
					686.8438      0.3  ?
					687.3686      0.5  ?
					689.3985      3.8  b6/0.6
					690.3592      0.6  ?
					690.4081      1.2  b6i1/9.6
					696.4237      0.5  ?
					704.3734      6.2  ib(HPLEGAV)/1.1
					705.3770      1.2  ?
					712.3774      1.2  ?
					712.4236      0.4  ?
					716.3995      0.3  ?
					718.4359      0.4  y13^2/-1.8
					718.4857      3.2  y6/-0.7
					719.4893      0.9  y6i1/-0.4
					722.8954      0.3  ?
					746.4221      2.1  b7/3.4
					747.4250      0.9  b7i1/2.7
					751.4713      3.1  ia(PLEGAVVI)/0.1
					752.4750      1.1  ?
					757.4359      0.7  ia(HPLEGAVV)-18/0.5
					759.3774      0.3  ?
					759.8826      0.3  ?
					761.4579      1.7  ib(PLEGAVVI)-18/3.0
					767.3729      1.7  ?
					767.4279      1.4  ?
					767.8909      1.1  ?
					767.9744      0.5  p^2/3.9
					768.3308      3.7  ?
					768.3969      1.8  ?
					768.4350      0.5  ?
					772.4327      0.3  a8-17/-3.2,ia(LHPLEGAV)-17/-3.2
					775.4491      0.7  ia(HPLEGAVV)/3.9
					779.4668     23.1  ib(PLEGAVVI)/0.8
					780.4702      8.1  ?
					781.4731      0.7  ?
					785.4297      3.8  ib(HPLEGAVV)-18/-1.0
					786.4332      1.3  ?
					789.4626      1.5  a8/1.1,ia(LHPLEGAV)/1.1
					789.5237      1.2  y7/0.5
					793.4799      1.6  ?
					795.4964      0.5  ib(LEGAVVII)/-1.3
					799.3546      0.6  ?
					799.4465      0.7  b8-18/0.5,ib(LHPLEGAV)-18/0.5
					803.4415      9.7  ib(HPLEGAVV)/0.6
					804.4469      2.6  ?
					805.3883      1.6  ?
					809.2540      0.3  ?
					813.4462      0.5  ?
					817.4571     16.0  b8/0.5,ib(LHPLEGAV)/0.5
					818.4602      5.2  b8i1/0.2
					819.4636      0.5  b8i2/0.2
					825.4614      0.8  ?
					826.4654      0.6  ?
					827.4538      0.5  ?
					829.4836      0.5  ib(EGAVVIIF)/2.2
					830.4854      0.5  ?
					831.3987      0.3  ?
					840.4153      0.7  ?
					845.3979      1.5  ?
					846.4034      0.6  ?
					846.5461      6.2  y8/1.6,ia(PLEGAVVII)-18/1.6
					847.5490      2.6  y8i1/1.0
					864.5541      1.3  ia(PLEGAVVII)/-1.4
					870.5216      0.8  ia(HPLEGAVVI)-18/2.3,a9-18/2.3,ia(LHPLEGAVV)-18/2.3
					876.4267      0.8  ?
					877.9706      0.4  ?
					878.5369      0.5  ?
					880.4431      0.4  ?
					888.5300      2.9  a9/-0.2,ia(LHPLEGAVV)/-0.2,ia(HPLEGAVVI)/-0.2
					889.5317      1.2  a9i1/-2.1
					892.5509      7.6  ib(PLEGAVVII)/0.8
					893.5534      3.3  ?
					898.5155      5.3  b9-18/1.1,ib(LHPLEGAVV)-18/1.1,ib(HPLEGAVVI)-18/1.1
					899.5165      2.7  b9-18i1/-1.6
					902.4215      0.6  ?
					912.4938      1.9  ?
					913.5008      0.8  ?
					916.5259     36.6  b9/0.9,ib(LHPLEGAVV)/0.9,ib(HPLEGAVVI)/0.9
					917.5282     14.2  b9i1/-0.3
					918.5333      1.3  b9i2/1.6
					926.5359      0.8  ?
					930.4048      0.5  ?
					957.5749      0.5  y9-18/-2.0
					958.5882      0.7  y9-18i1/8.4
					959.4481      1.0  ?
					963.4608      1.4  ?
					975.5884      6.7  y9/1.1
					976.5911      3.6  y9i1/0.4
					977.5928      0.5  y9i2/-1.4
					978.5058      0.4  ?
					983.6039      0.5  ia(HPLEGAVVII)-18/0.2,ia(LHPLEGAVVI)-18/0.2
					987.0255      0.3  ?
					987.6002      1.3  a10/1.6
					988.6046      1.0  a10i1/2.7
					995.4904      0.6  ?
					996.4948      0.5  ?
					997.5883      0.6  b10-18/5.4
					1002.4842      2.0  ?
					1003.4899      0.8  ?
					1011.5983      3.6  ib(LHPLEGAVVI)-18/-0.3,ib(HPLEGAVVII)-18/-0.3
					1012.5975      1.6  ib(LHPLEGAVVI)-17/14.7,ib(HPLEGAVVII)-17/14.7
					1013.5430      2.5  ?
					1014.5447      1.3  ?
					1015.5948     27.9  b10/1.3
					1016.5977     14.3  b10i1/0.8
					1017.5952      1.4  b10i2/-5.0
					1029.6096      3.8  ib(LHPLEGAVVI)/0.4,ib(HPLEGAVVII)/0.4
					1030.4840      2.3  ?
					1030.6084      1.3  ?
					1031.4910      1.0  ?
					1031.6217      0.4  ?
					1032.4818      0.5  ?
					1039.6178      1.7  ib(PLEGAVVIIF)/-0.8
					1040.6277      0.8  ?
					1050.4901      3.2  ?
					1051.4973      0.6  ?
					1059.5090      0.7  ?
					1060.5125      0.5  ?
					1087.5112      0.7  ?
					1088.5067      0.5  ?
					1088.6720      4.9  y10/0.5
					1089.6760      3.6  y10i1/1.1
					1092.7739      0.3  ?
					1098.6593      0.5  ?
					1100.6830      1.1  a11/0.3
					1101.6910      0.6  a11i1/4.5
					1107.5917      0.3  ?
					1128.6788     11.8  b11/1.1
					1129.6798      6.8  b11i1/-1.0
					1130.4912      0.3  ?
					1130.6853      0.7  b11i2/0.8
					1142.6851      0.4  ib(LHPLEGAVVII)/-7.1
					1146.2189      0.3  ?
					1149.5562      4.0  ?
					1150.5586      3.0  ?
					1151.5667      0.7  ?
					1158.6716      0.8  ib(HPLEGAVVIIF)-18/4.0
					1160.6117      1.0  ?
					1161.6194      0.9  ?
					1163.5780      1.3  ?
					1167.7206      0.7  y11-18/6.0
					1168.7201      0.5  y11-18i1/2.6
					1176.6823      0.7  ib(HPLEGAVVIIF)/4.0
					1177.5525      2.6  ?
					1177.6803      0.7  ?
					1178.5500      1.8  ?
					1179.5555      0.3  ?
					1185.7253     30.9  y11/1.0
					1186.7278     18.4  y11i1/0.2
					1187.7351      2.5  y11i2/3.5
					1206.5771      1.4  ?
					1207.5790      0.6  ?
					1222.6198      0.4  ?
					1231.6365      0.4  ?
					1234.5920      0.5  ?
					1235.5745      0.7  ?
					1241.7684      2.1  b12/5.5
					1242.7723      1.2  b12i1/5.9
					1288.6672      1.4  ?
					1289.6685      1.0  ?
					1322.7939      1.1  y12/8.2
					1323.7919      0.8  y12i1/4.1
					1385.7195      1.9  ?
					1386.7281      0.8  ?
					1440.7303      2.5  ?
					1441.7297      2.6  ?



					</PRE>
					<!--SBEAMS_PAGE_OK-->


					<!-- ------------------------ End of main content ------------------------ -->
					<!--footer-->

					</td></tr>
					</table>

					<td height="600" width="1"></td>
					<tr>
					<td colspan="2" bgcolor="#827975" height="3">
					<center><span class="copyright">&copy; 2004-2019, Institute for Systems Biology. All Rights Reserved</span>
					<br></center>
					</td>
					<td height="1" width="1">
					<img src="/sbeams/images/clear.gif" border="0" height="1" width="1">
					</td>
					</tr>


					<tr height="5">
					<td colspan="2" bgcolor="#294a93" height="5">
					<img src="/sbeams/images/clear.gif" border="0" height="5" width="1">
					</td>
					<td height="5" width="1">
					<img src="/sbeams/images/clear.gif" border="0" height="1" width="1">
					</td>
					</tr>

					</table>
					<!-- End Main page table -->
					<a class="leftnavlink" href="http://www.peptideatlas.org/funding.php">Project funding:</a>&nbsp;&nbsp;&nbsp;&nbsp;
					<br/>
					<IMG height="50" SRC="/sbeams/images/EUC_logo_en.gif">&nbsp;&nbsp;
					<IMG height="50" SRC="/sbeams/images/nci-logo-english.gif">&nbsp;&nbsp;
					<IMG height="50" SRC="/sbeams/images/nhgri.jpg">&nbsp;&nbsp;
					<IMG height="50" SRC="/sbeams/images/nigms.jpg">&nbsp;&nbsp;
					<br/>


					<!-- Google Analytics -->
					<script type="text/javascript">
					var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
					document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
					</script>
					<script type="text/javascript">
					var pageTracker = _gat._getTracker("UA-2217548-2");
					pageTracker._setDomainName("none");
					pageTracker._setAllowLinker(true);
					pageTracker._initData();
					pageTracker._trackPageview();
					</script>
					<!-- End Google Analytics -->


					</body>
					</html>




					</TD></TR></TABLE>
					</TD></TR></TABLE>
					<BR><HR SIZE=5 NOSHADE><BR>
					`
					A = [1, 1.5, 3, 4];
					b = [2, 3.3, 2.9, 4.001];
				});
it('processIt', ()=>{
	let regexp = /^(\s)*(?<mz>(\d)*\.(\d)*)(\s)*(?<intensity>(\d)*\.(\d)*)/gm;
	const r = [...response.matchAll(regexp)]
		.map((e) => {
		return {"mz": parseFloat(e["groups"]["mz"]),
			"intensity": parseFloat(e["groups"]["intensity"])}
	});
	assert.deepEqual(r[0]["mz"], 110.0712);
	assert.deepEqual(r[0]["intensity"], 91.2);
	assert.deepEqual(r.length, 564);
});
});
describe('Parse USI endpoints', () => {

	describe('PeptideAtlas', ()=> {
		let response = "";
		beforeEach(() => {
		});
		it('processIt2', ()=>{
		})});
});

});

