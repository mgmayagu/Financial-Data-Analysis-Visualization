(function($) {

	skel.breakpoints({
		xlarge: '(max-width: 1680px)',
		large: '(max-width: 1280px)',
		medium: '(max-width: 980px)',
		small: '(max-width: 736px)',
		xsmall: '(max-width: 480px)'
	});

	$(function() {

		var	$window 	= $(window),
			$body 		= $('body'),
			$header 	= $('#header');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Gallery.
			$('.gallery').poptrox();

	});

})(jQuery);

var line_chart = {
	"$schema": "https://vega.github.io/schema/vega-lite/v4.json",
	"title": "Total Monthly Spending",
	"data": {"url": "https://raw.githubusercontent.com/mgmayagu/Visualization/master/data/debit_combined.csv"},
	"mark": {
	  "type": "line",
	  "point": true
	},
	"width": 800,
	"height": 600,
	"encoding": {
	  "x": {
		"title": "Month",
		"timeUnit": "month",
		"field": "transaction_date",
		"type": "temporal"},
	  "y": {
		"title": "Total Spent ($)",
		"aggregate":"sum",
		"field": "transaction_amount",
		"type": "quantitative"},
	  "color": {
		"title": "Account",
		"field": "account_number",
		"type": "nominal"},
	  "tooltip": {
		"aggregate": "sum",
		"field": "transaction_amount",
		"type": "quantitative"}
	 }
}
  
var both_graphs = {
	"$schema": "https://vega.github.io/schema/vega-lite/v4.json",
	"data": {"url": "https://raw.githubusercontent.com/mgmayagu/Visualization/master/data/debit_combined.csv"},
	  "transform":[
	  {"filter": "datum.category != 'Earnings'"},
	  {"filter": "datum.category != 'Earning'"}
	],
	"vconcat": [
	  {
		"selection": {
		  "brush": {
			"encodings": ["x"],
			"type": "interval"}
		},
		"mark": "point",
		"width": 800,
		"height": 500,
		"encoding": {
		  "x": {
			"axis": {"title": "Date", "format": "%b"},
			"field": "transaction_date",
			"timeUnit": "monthdate",
			"type": "temporal"},
		  "y": {
			"axis": {"title": "Amount ($)"},
			"field": "transaction_amount",
			"type": "quantitative"},
		  "color": {
			"condition": {
			  "field": "account_number",
			  "type": "nominal",
			  "selection": "brush",
			  "scale": {"range": ["#3b5a9d", "#ffa633"]}
			},
			"value": "lightgray"
		  }
		}
	  },
	  {
		"selection": {
		  "highlight": {
			"type": "single",
			"empty": "none",
			"on": "mouseover"
		  },
		  "select": {"type": "multi"}
		},
		"transform": [{"filter": {"selection": "brush"}}],
		"width": {"step": 45},
		"mark": {
		  "type": "bar",
		  "cursor": "pointer",
		  "stroke": "black"
		},
		"encoding": {
		   "column": {
			 "title": "Categories",
			 "field": "category",
			 "type": "nominal",
			 "spacing": 10
		   },
		  "x": {
			"field": "account_number",
			"type": "nominal",
			"axis": {"title": ""}
		  },
		  "y": {
			"axis": {"title": "Amount ($)", "grid": false},
			"aggregate": "sum",
			"field": "transaction_amount",
			"type": "quantitative"
		  },
		  "fillOpacity": {
			"condition": {"selection": "select", "value": 1},
			"value": 0.3
		  },
		  "strokeWidth": {
			"condition": [
			  {"test": {"and": [{"selection": "select"},"length(data(\"select_store\"))"]},"value": 2},
			  {"selection": "highlight", "value": 1}
			],
			"value": 0
		  },
		  "color": {
			"title": "Account",
			"field": "account_number",
			"type": "nominal",
			"scale": {"range": ["#3b5a9d", "#ffa633"]}
		  },
		  "tooltip": {
			"aggregate": "sum",
			"field": "transaction_amount",
			"type": "quantitative"}
		  },
		  "config": {
			"view": {"stroke": "transparent"},
			"axis": {"domainWidth": 1}
		  }
	 }
	]
	}

var radial_chart = {
	"$schema": "https://vega.github.io/schema/vega-lite/v4.json",
	"data": { "url": "https://raw.githubusercontent.com/mgmayagu/Visualization/master/data/debit_combined.csv"},
	 "width": 500,
	 "height": 400,
	 "layer": [{
	   "mark": {
		 "type": "arc",
		 "innerRadius": 30,
		 "stroke": "#fff"}
	   },
	   {
	   "mark": {
		 "type": "text",
		 "radiusOffset": 30},
	   "encoding": {
		 "text": {
		   "aggregate": "sum",
		   "field": "transaction_amount",
		   "type": "quantitative"}
	   }
	   }
	 ],
	 "encoding": {
	   "theta": {
		 "aggregate": "sum",
		 "field": "transaction_amount",
		 "type": "quantitative",
		 "stack": true},
	   "radius": {
		 "aggregate": "sum",
		 "field": "transaction_amount",
		 "type": "quantitative",
		 "scale": {
		   "type": "sqrt",
		   "zero": true,
		   "range": [20, 150]}},
	   "color": {
		 "title": "Season",
		 "field": "Season",
		 "type": "nominal",
		 "scale": {
		   "domain": ["Winter", "Spring", "Summer", "Fall"],
		   "range": ["#3b5a9d", "#4fb2aa", "#faa633", "#da5e3c"]
		 }
	   }
	 }
	}

var parallel_coordinate_graph = {
	"$schema": "https://vega.github.io/schema/vega/v5.json",
	"width": 900,
	"height": 500,
	"padding": 5,
	"config": {
	"axisY": {
	 "titleX": -2,
	 "titleY": 510,
	 "titleAngle": 0,
	 "titleAlign": "right",
	 "titleBaseline": "top"
	}
	},
	"data": [
	{
	 "name": "debit",
	 "url": "https://raw.githubusercontent.com/mgmayagu/Visualization/master/data/monthly_expenses.json",
	 "format": {
	   "type": "json",
	   "parse": {"Month": "date:%Y-%m-%d"}
	 }
	},
	{
	 "name": "fields",
	 "values": [
	   "Month",
	   "Investment",
	   "Food",
	   "Entertainment",
	   "Transportation",
	   "Travel",
	   "Shopping",
	   "Health",
	   "Education",
	   "Other"
	 ]
	}
	],
	"legends": [
	  {
		"stroke": "color",
		"title": "Account",
		"padding": 4,
		"encode": {
		  "symbols": {
			"enter": {
			  "strokeWidth": {"value": 4},
			  "size": {"value": 20}
			}
		  }
		}
	  }
	],
	"scales": [
	{
	 "name": "ord", "type": "point",
	 "range": "width", "round": true,
	 "domain": {"data": "fields", "field": "data"}
	},
	{
	 "name": "Month", "type": "time",
	 "range": "height", "nice": {"interval": "month", "step": 11},  "reverse": true,"domain": {"data": "debit", "field": "Month"}
	},
	{
	 "name": "Education", "type": "linear",
	 "range": "height", "zero": false, "nice": true,
	 "domain": {"data": "debit", "field": "Education"}
	},
	{
	 "name": "Entertainment", "type": "linear",
	 "range": "height", "zero": false, "nice": true,
	 "domain": {"data": "debit", "field": "Entertainment"}
	},
	{
	 "name": "Food", "type": "linear",
	 "range": "height", "zero": false, "nice": true,
	 "domain": {"data": "debit", "field": "Food"}
	},
	{
	 "name": "Health", "type": "linear",
	 "range": "height", "zero": false, "nice": true,
	 "domain": {"data": "debit", "field": "Health"}
	},
	{
	 "name": "Investment", "type": "linear",
	 "range": "height", "zero": false, "nice": true,
	 "domain": {"data": "debit", "field": "Investment"}
	},
	{
	 "name": "Other", "type": "linear",
	 "range": "height", "zero": false, "nice": true,
	 "domain": {"data": "debit", "field": "Other"}
	},
	{
	 "name": "Shopping", "type": "linear",
	 "range": "height", "zero": false, "nice": true,
	 "domain": {"data": "debit", "field": "Shopping"}
	},
	{
	 "name": "Transportation", "type": "linear",
	 "range": "height", "zero": false, "nice": true,
	 "domain": {"data": "debit", "field": "Transportation"}
	},
	{
	 "name": "Travel", "type": "linear",
	 "range": "height", "zero": false, "nice": true,
	 "domain": {"data": "debit", "field": "Travel"}
	},
	{
	  "name": "color",
	  "type": "ordinal",
	  "range": {"scheme": "tableau10"},
	  "domain": {"data": "debit", "field": "account_number"}
	}
	],
	"axes": [
	{
	 "orient": "left", "zindex": 1,
	 "scale": "Month", "title": "Month", "format": "%B",
	 "offset": {"scale": "ord", "value": "Month", "mult": -1}
	},
	{
	 "orient": "left", "zindex": 1,
	 "scale": "Education", "title": "Education",
	 "offset": {"scale": "ord", "value": "Education", "mult": -1}
	},
	{
	 "orient": "left", "zindex": 1,
	 "scale": "Entertainment", "title": "Entertainment",
	 "offset": {"scale": "ord", "value": "Entertainment", "mult": -1}
	},
	{
	 "orient": "left", "zindex": 1,
	 "scale": "Food", "title": "Food",
	 "offset": {"scale": "ord", "value": "Food", "mult": -1}
	},
	{
	 "orient": "left", "zindex": 1,
	 "scale": "Health", "title": "Health",
	 "offset": {"scale": "ord", "value": "Health", "mult": -1}
	},
	{
	 "orient": "left", "zindex": 1,
	 "scale": "Investment", "title": "Investment",
	 "offset": {"scale": "ord", "value": "Investment", "mult": -1}
	},
	{
	 "orient": "left", "zindex": 1,
	 "scale": "Other", "title": "Other",
	 "offset": {"scale": "ord", "value": "Other", "mult": -1}
	},
	{
	 "orient": "left", "zindex": 1,
	 "scale": "Shopping", "title": "Shopping",
	 "offset": {"scale": "ord", "value": "Shopping", "mult": -1}
	},
	{
	 "orient": "left", "zindex": 1,
	 "scale": "Transportation", "title": "Transportation",
	 "offset": {"scale": "ord", "value": "Transportation", "mult": -1}
	},
	{
	 "orient": "left", "zindex": 1,
	 "scale": "Travel", "title": "Travel",
	 "offset": {"scale": "ord", "value": "Travel", "mult": -1}
	}
	],
	"marks": [
	{
	 "type": "group",
	 "from": {"data": "debit"},
	 "marks": [
	   {
		 "type": "line",
		 "from": {"data": "fields"},
		 "encode": {
		   "enter": {
			 "x": {"scale": "ord", "field": "data"},
			 "y": {
			   "scale": {"datum": "data"},
			   "field": {"parent": {"datum": "data"}}
			 },
			 "stroke": {"value": "steelblue"},
			 "strokeWidth": {"value": 1.01},
			 "strokeOpacity": {"value": 0.7}
		   }
		 }
	   }
	 ]
	}
	]
	}

vegaEmbed('#line_vis', line_chart);
vegaEmbed('#both_vis', both_graphs);
vegaEmbed('#radial_vis', radial_chart);
vegaEmbed('#parallel_vis', parallel_coordinate_graph);