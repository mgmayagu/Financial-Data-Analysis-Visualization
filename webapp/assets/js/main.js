// Visualizatons
var line_chart_2019 = {
	"$schema": "https://vega.github.io/schema/vega-lite/v4.json",
	"title": "2019",
	"data": {
	  "url": "https://raw.githubusercontent.com/mgmayagu/Visualization/master/data/debit_combined_2019.csv"
	},
	"mark": {"type": "line", "point": true},
	"width": 550,
	"height": 300,
	"encoding": {
	  "x": {
		"title": "Month",
		"timeUnit": "month",
		"field": "transaction_date",
		"type": "temporal"
	  },
	  "y": {
		"title": "Total Spent ($)",
		"aggregate": "sum",
		"field": "transaction_amount",
		"type": "quantitative"
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
		"type": "quantitative"
		}
	}
}

var line_chart_2020 = {
	"$schema": "https://vega.github.io/schema/vega-lite/v4.json",
	"title": "2020",
	"data": {
	  "url": "https://raw.githubusercontent.com/mgmayagu/Visualization/master/data/debit_combined_2020.csv"
	},
	"mark": {"type": "line", "point": true},
	"transform": [
	  {"timeUnit": "month", "field": "transaction_date", "as": "month"}
	],
	"width": 200,
	"height": 300,
	"encoding": {
	  "x": {
		"title": "Month",
		"field": "month",
		"type": "temporal",
		"axis": {"format": "%b"}
	  },
	  "y": {
		"title": "Total Spent ($)",
		"aggregate": "sum",
		"field": "transaction_amount",
		"type": "quantitative"
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
		"type": "quantitative"
	  }
	}
}
  
var both_graphs_2019 = {
	"$schema": "https://vega.github.io/schema/vega-lite/v4.json",
	"title": "2019",
	"data": {
	  "url": "https://raw.githubusercontent.com/mgmayagu/Visualization/master/data/debit_combined_2019.csv"
	},
	"hconcat": [
	  {
		"selection": {
		  "brush": {"type": "interval"},
		  "Select": {
			"type": "single",
			"fields": ["Account"],
			"bind": {
			  "Account": {"input": "select", "options": [null, "7157", "8821"]}
			}
		  }
		},
		"transform": [
		  {"filter": {"selection": "Select"}},
		  {"calculate": "datum.account_number", "as": "Account"}
		],
		"mark": "circle",
		"width": 435,
		"height": 350,
		"encoding": {
		  "x": {
			"axis": {"title": "Date"},
			"field": "transaction_date",
			"timeUnit": "monthdate",
			"type": "temporal"
		  },
		  "y": {
			"axis": {"title": "Amount ($)"},
			"field": "transaction_amount",
			"type": "quantitative",
			"scale": {"domain": [0, 1800]}
		  },
		  "color": {
			"condition": {
			  "field": "account_number",
			  "type": "nominal",
			  "selection": "brush",
			  "scale": {
				"domain": ["7157", "8821"],
				"range": ["#3b5a9d", "#ffa633"]
			  }
			},
			"value": "lightgray"
		  }
		}
	  },
	  {
		"selection": {
		  "highlight": {"type": "single", "empty": "none", "on": "mouseover"},
		  "select": {"type": "multi"},
		  "Select": {
			"type": "single",
			"fields": ["Account"],
			"bind": {
			  "Account": {"input": "radio", "options": [null, "7157", "8821"]}
			}
		  }
		},
		"transform": [
		  {"filter": {"selection": "brush"}},
		  {"filter": {"selection": "Select"}},
		  {"calculate": "datum.account_number", "as": "Account"}
		],
		"width": {"step": 12.5},
		"height": 350,
		"mark": {"type": "bar", "cursor": "pointer", "stroke": "black"},
		"encoding": {
		  "column": {
			"title": null,
			"field": "category",
			"type": "nominal",
			"spacing": 31
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
			  {
				"test": {
				  "and": [
					{"selection": "select"},
					"length(data(\"select_store\"))"
				  ]
				},
				"value": 2
			  },
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
			"type": "quantitative"
		  }
		},
		"config": {"view": {"stroke": "transparent"}, "axis": {"domainWidth": 1}}
	  }
	]
  }

var both_graphs_2020 = {
	"$schema": "https://vega.github.io/schema/vega-lite/v4.json",
	"title": "2020",
	"data": {
	  "url": "https://raw.githubusercontent.com/mgmayagu/Visualization/master/data/debit_combined_2020.csv"
	},
	"hconcat": [
	  {
		"selection": {
		  "brush": {"type": "interval"},
		  "Select": {
			"type": "single",
			"fields": ["Account"],
			"bind": {
			  "Account": {"input": "select", "options": [null, "7157", "8821"]}
			}
		  }
		},
		"transform": [
		  {"filter": {"selection": "Select"}},
		  {"calculate": "datum.account_number", "as": "Account"}
		],
		"mark": "circle",
		"width": 440,
		"height": 350,
		"encoding": {
		  "x": {
			"axis": {"title": "Date"},
			"field": "transaction_date",
			"timeUnit": "monthdate",
			"type": "temporal"
		  },
		  "y": {
			"axis": {"title": "Amount ($)"},
			"field": "transaction_amount",
			"type": "quantitative",
			"scale": {"domain": [0, 1800]}
		  },
		  "color": {
			"condition": {
			  "field": "account_number",
			  "type": "nominal",
			  "selection": "brush",
			  "scale": {
				"domain": ["7157", "8821"],
				"range": ["#3b5a9d", "#ffa633"]
			  }
			},
			"value": "lightgray"
		  }
		}
	  },
	  {
		"selection": {
		  "highlight": {"type": "single", "empty": "none", "on": "mouseover"},
		  "select": {"type": "multi"},
		  "Select": {
			"type": "single",
			"fields": ["Account"],
			"bind": {
			  "Account": {"input": "radio", "options": [null, "7157", "8821"]}
			}
		  }
		},
		"transform": [
		  {"filter": {"selection": "brush"}},
		  {"filter": {"selection": "Select"}},
		  {"calculate": "datum.account_number", "as": "Account"}
		],
		"width": {"step": 12.5},
		"height": 350,
		"mark": {"type": "bar", "cursor": "pointer", "stroke": "black"},
		"encoding": {
		  "column": {
			"title": null,
			"field": "category",
			"type": "nominal",
			"spacing": 31
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
			  {
				"test": {
				  "and": [
					{"selection": "select"},
					"length(data(\"select_store\"))"
				  ]
				},
				"value": 2
			  },
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
			"type": "quantitative"
		  }
		},
		"config": {"view": {"stroke": "transparent"}, "axis": {"domainWidth": 1}}
	  }
	]
  }

var radial_chart_2019 = {
	"$schema": "https://vega.github.io/schema/vega-lite/v4.json",
	"title": "2019",
	"data": {
	  "url": "https://raw.githubusercontent.com/mgmayagu/Visualization/master/data/debit_combined_2019.csv"
	},
	"hconcat": [
	  {
		"title": "Both Accounts",
		"width": 310,
		"height": 375,
		"mark": {
		  "type": "arc",
		  "innerRadius": 28,
		  "stroke": "white",
		  "cursor": "pointer"
		},
		"selection": {
		  "Select": {
			"type": "single",
			"fields": ["Category"],
			"bind": {
			  "Category": {
				"input": "select",
				"options": [
				  null,
				  "Education",
				  "Entertainment",
				  "Food",
				  "Health",
				  "Investment",
				  "Shopping",
				  "Transportation",
				  "Travel",
				  "Other"
				]
			  }
			}
		  },
		  "highlight": {"type": "single", "empty": "none", "on": "mouseover"},
		  "select": {"type": "multi"}
		},
		"transform": [
		  {"filter": {"selection": "Select"}},
		  {"calculate": "datum.category", "as": "Category"}
		],
		"encoding": {
		  "theta": {
			"aggregate": "sum",
			"field": "transaction_amount",
			"type": "quantitative",
			"stack": true
		  },
		  "radius": {
			"aggregate": "sum",
			"field": "transaction_amount",
			"type": "quantitative",
			"scale": {"type": "sqrt", "zero": true, "range": [15, 150]}
		  },
		  "fillOpacity": {
			"condition": {"selection": "select", "value": 1},
			"value": 0.3
		  },
		  "strokeWidth": {
			"condition": [
			  {
				"test": {
				  "and": [
					{"selection": "select"},
					"length(data(\"select_store\"))"
				  ]
				},
				"value": 2
			  },
			  {"selection": "highlight", "value": 3}
			],
			"value": 0
		  },
		  "color": {
			"title": "Season",
			"field": "season",
			"type": "nominal",
			"scale": {
			  "domain": ["Winter", "Spring", "Summer", "Fall"],
			  "range": ["#3b5a9d", "#4fb2aa", "#faa633", "#da5e3c"]
			}
		  },
		  "tooltip": {
			"aggregate": "sum",
			"field": "transaction_amount",
			"type": "quantitative"
		  }
		}
	  },
	  {
		"title": "Account 7157",
		"width": 400,
		"height": 350,
		"mark": {
		  "type": "arc",
		  "innerRadius": 28,
		  "stroke": "white",
		  "cursor": "pointer"
		},
		"selection": {
		  "highlight": {"type": "single", "empty": "none", "on": "mouseover"},
		  "select": {"type": "multi"}
		},
		"transform": [
		  {"filter": "datum.account_number == '7157'"},
		  {"filter": {"selection": "Select"}},
		  {"calculate": "datum.category", "as": "Category"}
		],
		"encoding": {
		  "theta": {
			"aggregate": "sum",
			"field": "transaction_amount",
			"type": "quantitative",
			"stack": true
		  },
		  "radius": {
			"aggregate": "sum",
			"field": "transaction_amount",
			"type": "quantitative",
			"scale": {"type": "sqrt", "zero": true, "range": [15, 150]}
		  },
		  "fillOpacity": {
			"condition": {"selection": "select", "value": 1},
			"value": 0.3
		  },
		  "strokeWidth": {
			"condition": [
			  {
				"test": {
				  "and": [
					{"selection": "select"},
					"length(data(\"select_store\"))"
				  ]
				},
				"value": 2
			  },
			  {"selection": "highlight", "value": 3}
			],
			"value": 0
		  },
		  "color": {
			"title": "Season",
			"field": "season",
			"type": "nominal",
			"scale": {
			  "domain": ["Winter", "Spring", "Summer", "Fall"],
			  "range": ["#3b5a9d", "#4fb2aa", "#faa633", "#da5e3c"]
			}
		  },
		  "tooltip": {
			"aggregate": "sum",
			"field": "transaction_amount",
			"type": "quantitative"
		  }
		}
	  },
	  {
		"title": "Account 8821",
		"width": 400,
		"height": 350,
		"mark": {
		  "type": "arc",
		  "innerRadius": 28,
		  "stroke": "white",
		  "cursor": "pointer"
		},
		"selection": {
		  "highlight": {"type": "single", "empty": "none", "on": "mouseover"},
		  "select": {"type": "multi"}
		},
		"transform": [
		  {"filter": "datum.account_number == '8821'"},
		  {"filter": {"selection": "Select"}},
		  {"calculate": "datum.category", "as": "Category"}
		],
		"encoding": {
		  "theta": {
			"aggregate": "sum",
			"field": "transaction_amount",
			"type": "quantitative",
			"stack": true
		  },
		  "radius": {
			"aggregate": "sum",
			"field": "transaction_amount",
			"type": "quantitative",
			"scale": {"type": "sqrt", "zero": true, "range": [15, 150]}
		  },
		  "fillOpacity": {
			"condition": {"selection": "select", "value": 1},
			"value": 0.3
		  },
		  "strokeWidth": {
			"condition": [
			  {
				"test": {
				  "and": [
					{"selection": "select"},
					"length(data(\"select_store\"))"
				  ]
				},
				"value": 2
			  },
			  {"selection": "highlight", "value": 3}
			],
			"value": 0
		  },
		  "color": {
			"title": "Season",
			"field": "season",
			"type": "nominal",
			"scale": {
			  "domain": ["Winter", "Spring", "Summer", "Fall"],
			  "range": ["#3b5a9d", "#4fb2aa", "#faa633", "#da5e3c"]
			}
		  },
		  "tooltip": {
			"aggregate": "sum",
			"field": "transaction_amount",
			"type": "quantitative"
		  }
		}
	  }
	]
  }

var radial_chart_2020 = {
	"$schema": "https://vega.github.io/schema/vega-lite/v4.json",
	"title": "2020",
	"data": {
	  "url": "https://raw.githubusercontent.com/mgmayagu/Visualization/master/data/debit_combined_2020.csv"
	},
	"hconcat": [
	  {
		"title": "Both Accounts",
		"width": 310,
		"height": 375,
		"mark": {
		  "type": "arc",
		  "innerRadius": 28,
		  "stroke": "white",
		  "cursor": "pointer"
		},
		"selection": {
		  "Select": {
			"type": "single",
			"fields": ["Category"],
			"bind": {
			  "Category": {
				"input": "select",
				"options": [
				  null,
				  "Education",
				  "Entertainment",
				  "Food",
				  "Health",
				  "Investment",
				  "Shopping",
				  "Transportation",
				  "Travel",
				  "Other"
				]
			  }
			}
		  },
		  "highlight": {"type": "single", "empty": "none", "on": "mouseover"},
		  "select": {"type": "multi"}
		},
		"transform": [
		  {"filter": {"selection": "Select"}},
		  {"calculate": "datum.category", "as": "Category"}
		],
		"encoding": {
		  "theta": {
			"aggregate": "sum",
			"field": "transaction_amount",
			"type": "quantitative",
			"stack": true
		  },
		  "radius": {
			"aggregate": "sum",
			"field": "transaction_amount",
			"type": "quantitative",
			"scale": {"type": "sqrt", "zero": true, "range": [15, 150]}
		  },
		  "fillOpacity": {
			"condition": {"selection": "select", "value": 1},
			"value": 0.3
		  },
		  "strokeWidth": {
			"condition": [
			  {
				"test": {
				  "and": [
					{"selection": "select"},
					"length(data(\"select_store\"))"
				  ]
				},
				"value": 2
			  },
			  {"selection": "highlight", "value": 3}
			],
			"value": 0
		  },
		  "color": {
			"title": "Season",
			"field": "season",
			"type": "nominal",
			"scale": {
			  "domain": ["Winter", "Spring", "Summer", "Fall"],
			  "range": ["#3b5a9d", "#4fb2aa", "#faa633", "#da5e3c"]
			}
		  },
		  "tooltip": {
			"aggregate": "sum",
			"field": "transaction_amount",
			"type": "quantitative"
		  }
		}
	  },
	  {
		"title": "Account 7157",
		"width": 400,
		"height": 350,
		"mark": {
		  "type": "arc",
		  "innerRadius": 28,
		  "stroke": "white",
		  "cursor": "pointer"
		},
		"selection": {
		  "highlight": {"type": "single", "empty": "none", "on": "mouseover"},
		  "select": {"type": "multi"}
		},
		"transform": [
		  {"filter": "datum.account_number == '7157'"},
		  {"filter": {"selection": "Select"}},
		  {"calculate": "datum.category", "as": "Category"}
		],
		"encoding": {
		  "theta": {
			"aggregate": "sum",
			"field": "transaction_amount",
			"type": "quantitative",
			"stack": true
		  },
		  "radius": {
			"aggregate": "sum",
			"field": "transaction_amount",
			"type": "quantitative",
			"scale": {"type": "sqrt", "zero": true, "range": [15, 150]}
		  },
		  "fillOpacity": {
			"condition": {"selection": "select", "value": 1},
			"value": 0.3
		  },
		  "strokeWidth": {
			"condition": [
			  {
				"test": {
				  "and": [
					{"selection": "select"},
					"length(data(\"select_store\"))"
				  ]
				},
				"value": 2
			  },
			  {"selection": "highlight", "value": 3}
			],
			"value": 0
		  },
		  "color": {
			"title": "Season",
			"field": "season",
			"type": "nominal",
			"scale": {
			  "domain": ["Winter", "Spring", "Summer", "Fall"],
			  "range": ["#3b5a9d", "#4fb2aa", "#faa633", "#da5e3c"]
			}
		  },
		  "tooltip": {
			"aggregate": "sum",
			"field": "transaction_amount",
			"type": "quantitative"
		  }
		}
	  },
	  {
		"title": "Account 8821",
		"width": 400,
		"height": 350,
		"mark": {
		  "type": "arc",
		  "innerRadius": 28,
		  "stroke": "white",
		  "cursor": "pointer"
		},
		"selection": {
		  "highlight": {"type": "single", "empty": "none", "on": "mouseover"},
		  "select": {"type": "multi"}
		},
		"transform": [
		  {"filter": "datum.account_number == '8821'"},
		  {"filter": {"selection": "Select"}},
		  {"calculate": "datum.category", "as": "Category"}
		],
		"encoding": {
		  "theta": {
			"aggregate": "sum",
			"field": "transaction_amount",
			"type": "quantitative",
			"stack": true
		  },
		  "radius": {
			"aggregate": "sum",
			"field": "transaction_amount",
			"type": "quantitative",
			"scale": {"type": "sqrt", "zero": true, "range": [15, 150]}
		  },
		  "fillOpacity": {
			"condition": {"selection": "select", "value": 1},
			"value": 0.3
		  },
		  "strokeWidth": {
			"condition": [
			  {
				"test": {
				  "and": [
					{"selection": "select"},
					"length(data(\"select_store\"))"
				  ]
				},
				"value": 2
			  },
			  {"selection": "highlight", "value": 3}
			],
			"value": 0
		  },
		  "color": {
			"title": "Season",
			"field": "season",
			"type": "nominal",
			"scale": {
			  "domain": ["Winter", "Spring", "Summer", "Fall"],
			  "range": ["#3b5a9d", "#4fb2aa", "#faa633", "#da5e3c"]
			}
		  },
		  "tooltip": {
			"aggregate": "sum",
			"field": "transaction_amount",
			"type": "quantitative"
		  }
		}
	  }
	]
  }

var parallel_coordinate_graph_mm2019 ={
	"$schema": "https://vega.github.io/schema/vega/v5.json",
	"title": {"text": "Account", "subtitle": "7157", "orient": "left"},
	"width":465,
	"height": 350,
	"padding": 5,
	"config": {
	  "axisY": {
		"titleX": -2,
		"titleY": 360,
		"titleAngle": -30,
		"titleAlign": "right",
		"titleBaseline": "top"
	  }
	},
	"data": [
	  {
		"name": "debit",
		"url": "https://raw.githubusercontent.com/mgmayagu/Visualization/master/data/monthly_expenses_2019.json",
		"format": {"type": "json", "parse": {"Month": "date:%Y-%m-%d"}},
		"transform": [
		  {"type": "filter", "expr": "datum.account_number == '7157'"}
		]
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
	"scales": [
	  {
		"name": "ord",
		"type": "point",
		"range": "width",
		"round": true,
		"domain": {"data": "fields", "field": "data"}
	  },
	  {
		"name": "Month",
		"type": "time",
		"range": "height",
		"nice": {"interval": "month", "step": 11},
		"reverse": true,
		"domain": {"data": "debit", "field": "Month"}
	  },
	  {
		"name": "Education",
		"type": "linear",
		"range": "height",
		"zero": false,
		"nice": true,
		"domain": {"data": "debit", "field": "Education"}
	  },
	  {
		"name": "Entertainment",
		"type": "linear",
		"range": "height",
		"zero": false,
		"nice": true,
		"domain": {"data": "debit", "field": "Entertainment"}
	  },
	  {
		"name": "Food",
		"type": "linear",
		"range": "height",
		"zero": false,
		"nice": true,
		"domain": {"data": "debit", "field": "Food"}
	  },
	  {
		"name": "Health",
		"type": "linear",
		"range": "height",
		"zero": false,
		"nice": true,
		"domain": {"data": "debit", "field": "Health"}
	  },
	  {
		"name": "Investment",
		"type": "linear",
		"range": "height",
		"zero": false,
		"nice": true,
		"domain": {"data": "debit", "field": "Investment"}
	  },
	  {
		"name": "Other",
		"type": "linear",
		"range": "height",
		"zero": false,
		"nice": true,
		"domain": {"data": "debit", "field": "Other"}
	  },
	  {
		"name": "Shopping",
		"type": "linear",
		"range": "height",
		"zero": false,
		"nice": true,
		"domain": {"data": "debit", "field": "Shopping"}
	  },
	  {
		"name": "Transportation",
		"type": "linear",
		"range": "height",
		"zero": false,
		"nice": true,
		"domain": {"data": "debit", "field": "Transportation"}
	  },
	  {
		"name": "Travel",
		"type": "linear",
		"range": "height",
		"zero": false,
		"nice": true,
		"domain": {"data": "debit", "field": "Travel"}
	  }
	],
	"axes": [
	  {
		"orient": "left",
		"zindex": 1,
		"scale": "Month",
		"title": "Month",
		"format": "%B",
		"offset": {"scale": "ord", "value": "Month", "mult": -1}
	  },
	  {
		"orient": "left",
		"zindex": 1,
		"scale": "Education",
		"title": "Education",
		"offset": {"scale": "ord", "value": "Education", "mult": -1}
	  },
	  {
		"orient": "left",
		"zindex": 1,
		"scale": "Entertainment",
		"title": "Entertainment",
		"offset": {"scale": "ord", "value": "Entertainment", "mult": -1}
	  },
	  {
		"orient": "left",
		"zindex": 1,
		"scale": "Food",
		"title": "Food",
		"offset": {"scale": "ord", "value": "Food", "mult": -1}
	  },
	  {
		"orient": "left",
		"zindex": 1,
		"scale": "Health",
		"title": "Health",
		"offset": {"scale": "ord", "value": "Health", "mult": -1}
	  },
	  {
		"orient": "left",
		"zindex": 1,
		"scale": "Investment",
		"title": "Investment",
		"offset": {"scale": "ord", "value": "Investment", "mult": -1}
	  },
	  {
		"orient": "left",
		"zindex": 1,
		"scale": "Other",
		"title": "Other",
		"offset": {"scale": "ord", "value": "Other", "mult": -1}
	  },
	  {
		"orient": "left",
		"zindex": 1,
		"scale": "Shopping",
		"title": "Shopping",
		"offset": {"scale": "ord", "value": "Shopping", "mult": -1}
	  },
	  {
		"orient": "left",
		"zindex": 1,
		"scale": "Transportation",
		"title": "Transportation",
		"offset": {"scale": "ord", "value": "Transportation", "mult": -1}
	  },
	  {
		"orient": "left",
		"zindex": 1,
		"scale": "Travel",
		"title": "Travel",
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
				"stroke": {"value": "#3b5a9d"},
				"strokeWidth": {"value": 1.01},
				"strokeOpacity": {"value": 1}
			  }
			}
		  }
		]
	  }
	]
  }
var parallel_coordinate_graph_mm2020 = {
	"$schema": "https://vega.github.io/schema/vega/v5.json",
	"title": {"text": "Account", "subtitle": "7157", "orient": "left"},
	"width": 465,
	"height": 350,
	"padding": 5,
	"config": {
	  "axisY": {
		"titleX": -2,
		"titleY": 360,
		"titleAngle": -30,
		"titleAlign": "right",
		"titleBaseline": "top"
	  }
	},
	"data": [
	  {
		"name": "debit",
		"url": "https://raw.githubusercontent.com/mgmayagu/Visualization/master/data/monthly_expenses_2020.json",
		"format": {"type": "json", "parse": {"Month": "date:%Y-%m-%d"}},
		"transform": [
		  {"type": "filter", "expr": "datum.account_number == '7157'"}
		]
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
	"scales": [
	  {
		"name": "ord",
		"type": "point",
		"range": "width",
		"round": true,
		"domain": {"data": "fields", "field": "data"}
	  },
	  {
		"name": "Month",
		"type": "time",
		"range": "height",
		"nice": {"interval": "month", "step": 11},
		"reverse": true,
		"domain": {"data": "debit", "field": "Month"}
	  },
	  {
		"name": "Education",
		"type": "linear",
		"range": "height",
		"zero": false,
		"nice": true,
		"domain": {"data": "debit", "field": "Education"}
	  },
	  {
		"name": "Entertainment",
		"type": "linear",
		"range": "height",
		"zero": false,
		"nice": true,
		"domain": {"data": "debit", "field": "Entertainment"}
	  },
	  {
		"name": "Food",
		"type": "linear",
		"range": "height",
		"zero": false,
		"nice": true,
		"domain": {"data": "debit", "field": "Food"}
	  },
	  {
		"name": "Health",
		"type": "linear",
		"range": "height",
		"zero": false,
		"nice": true,
		"domain": {"data": "debit", "field": "Health"}
	  },
	  {
		"name": "Investment",
		"type": "linear",
		"range": "height",
		"zero": false,
		"nice": true,
		"domain": {"data": "debit", "field": "Investment"}
	  },
	  {
		"name": "Other",
		"type": "linear",
		"range": "height",
		"zero": false,
		"nice": true,
		"domain": {"data": "debit", "field": "Other"}
	  },
	  {
		"name": "Shopping",
		"type": "linear",
		"range": "height",
		"zero": false,
		"nice": true,
		"domain": {"data": "debit", "field": "Shopping"}
	  },
	  {
		"name": "Transportation",
		"type": "linear",
		"range": "height",
		"zero": false,
		"nice": true,
		"domain": {"data": "debit", "field": "Transportation"}
	  },
	  {
		"name": "Travel",
		"type": "linear",
		"range": "height",
		"zero": false,
		"nice": true,
		"domain": {"data": "debit", "field": "Travel"}
	  }
	],
	"axes": [
	  {
		"orient": "left",
		"zindex": 1,
		"scale": "Month",
		"title": "Month",
		"format": "%B",
		"offset": {"scale": "ord", "value": "Month", "mult": -1}
	  },
	  {
		"orient": "left",
		"zindex": 1,
		"scale": "Education",
		"title": "Education",
		"offset": {"scale": "ord", "value": "Education", "mult": -1}
	  },
	  {
		"orient": "left",
		"zindex": 1,
		"scale": "Entertainment",
		"title": "Entertainment",
		"offset": {"scale": "ord", "value": "Entertainment", "mult": -1}
	  },
	  {
		"orient": "left",
		"zindex": 1,
		"scale": "Food",
		"title": "Food",
		"offset": {"scale": "ord", "value": "Food", "mult": -1}
	  },
	  {
		"orient": "left",
		"zindex": 1,
		"scale": "Health",
		"title": "Health",
		"offset": {"scale": "ord", "value": "Health", "mult": -1}
	  },
	  {
		"orient": "left",
		"zindex": 1,
		"scale": "Investment",
		"title": "Investment",
		"offset": {"scale": "ord", "value": "Investment", "mult": -1}
	  },
	  {
		"orient": "left",
		"zindex": 1,
		"scale": "Other",
		"title": "Other",
		"offset": {"scale": "ord", "value": "Other", "mult": -1}
	  },
	  {
		"orient": "left",
		"zindex": 1,
		"scale": "Shopping",
		"title": "Shopping",
		"offset": {"scale": "ord", "value": "Shopping", "mult": -1}
	  },
	  {
		"orient": "left",
		"zindex": 1,
		"scale": "Transportation",
		"title": "Transportation",
		"offset": {"scale": "ord", "value": "Transportation", "mult": -1}
	  },
	  {
		"orient": "left",
		"zindex": 1,
		"scale": "Travel",
		"title": "Travel",
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
				"stroke": {"value": "#3b5a9d"},
				"strokeWidth": {"value": 1.01},
				"strokeOpacity": {"value": 1}
			  }
			}
		  }
		]
	  }
	]
  }
var parallel_coordinate_graph_mvs2019 = {
	"$schema": "https://vega.github.io/schema/vega/v5.json",
	"title": {"text": "Account", "subtitle": "8821", "orient": "left"},
	"width": 465,
	"height": 350,
	"padding": 5,
	"config": {
	  "axisY": {
		"titleX": -2,
		"titleY": 360,
		"titleAngle": -30,
		"titleAlign": "right",
		"titleBaseline": "top"
	  }
	},
	"data": [
	  {
		"name": "debit",
		"url": "https://raw.githubusercontent.com/mgmayagu/Visualization/master/data/monthly_expenses_2019.json",
		"format": {"type": "json", "parse": {"Month": "date:%Y-%m-%d"}},
		"transform": [
		  {"type": "filter", "expr": "datum.account_number == '8821'"}
		]
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
	"scales": [
	  {
		"name": "ord",
		"type": "point",
		"range": "width",
		"round": true,
		"domain": {"data": "fields", "field": "data"}
	  },
	  {
		"name": "Month",
		"type": "time",
		"range": "height",
		"nice": {"interval": "month", "step": 11},
		"reverse": true,
		"domain": {"data": "debit", "field": "Month"}
	  },
	  {
		"name": "Education",
		"type": "linear",
		"range": "height",
		"zero": false,
		"nice": true,
		"domain": {"data": "debit", "field": "Education"}
	  },
	  {
		"name": "Entertainment",
		"type": "linear",
		"range": "height",
		"zero": false,
		"nice": true,
		"domain": {"data": "debit", "field": "Entertainment"}
	  },
	  {
		"name": "Food",
		"type": "linear",
		"range": "height",
		"zero": false,
		"nice": true,
		"domain": {"data": "debit", "field": "Food"}
	  },
	  {
		"name": "Health",
		"type": "linear",
		"range": "height",
		"zero": false,
		"nice": true,
		"domain": {"data": "debit", "field": "Health"}
	  },
	  {
		"name": "Investment",
		"type": "linear",
		"range": "height",
		"zero": false,
		"nice": true,
		"domain": {"data": "debit", "field": "Investment"}
	  },
	  {
		"name": "Other",
		"type": "linear",
		"range": "height",
		"zero": false,
		"nice": true,
		"domain": {"data": "debit", "field": "Other"}
	  },
	  {
		"name": "Shopping",
		"type": "linear",
		"range": "height",
		"zero": false,
		"nice": true,
		"domain": {"data": "debit", "field": "Shopping"}
	  },
	  {
		"name": "Transportation",
		"type": "linear",
		"range": "height",
		"zero": false,
		"nice": true,
		"domain": {"data": "debit", "field": "Transportation"}
	  },
	  {
		"name": "Travel",
		"type": "linear",
		"range": "height",
		"zero": false,
		"nice": true,
		"domain": {"data": "debit", "field": "Travel"}
	  }
	],
	"axes": [
	  {
		"orient": "left",
		"zindex": 1,
		"scale": "Month",
		"title": "Month",
		"format": "%B",
		"offset": {"scale": "ord", "value": "Month", "mult": -1}
	  },
	  {
		"orient": "left",
		"zindex": 1,
		"scale": "Education",
		"title": "Education",
		"offset": {"scale": "ord", "value": "Education", "mult": -1}
	  },
	  {
		"orient": "left",
		"zindex": 1,
		"scale": "Entertainment",
		"title": "Entertainment",
		"offset": {"scale": "ord", "value": "Entertainment", "mult": -1}
	  },
	  {
		"orient": "left",
		"zindex": 1,
		"scale": "Food",
		"title": "Food",
		"offset": {"scale": "ord", "value": "Food", "mult": -1}
	  },
	  {
		"orient": "left",
		"zindex": 1,
		"scale": "Health",
		"title": "Health",
		"offset": {"scale": "ord", "value": "Health", "mult": -1}
	  },
	  {
		"orient": "left",
		"zindex": 1,
		"scale": "Investment",
		"title": "Investment",
		"offset": {"scale": "ord", "value": "Investment", "mult": -1}
	  },
	  {
		"orient": "left",
		"zindex": 1,
		"scale": "Other",
		"title": "Other",
		"offset": {"scale": "ord", "value": "Other", "mult": -1}
	  },
	  {
		"orient": "left",
		"zindex": 1,
		"scale": "Shopping",
		"title": "Shopping",
		"offset": {"scale": "ord", "value": "Shopping", "mult": -1}
	  },
	  {
		"orient": "left",
		"zindex": 1,
		"scale": "Transportation",
		"title": "Transportation",
		"offset": {"scale": "ord", "value": "Transportation", "mult": -1}
	  },
	  {
		"orient": "left",
		"zindex": 1,
		"scale": "Travel",
		"title": "Travel",
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
				"stroke": {"value": "#faa633"},
				"strokeWidth": {"value": 1.01},
				"strokeOpacity": {"value": 1}
			  }
			}
		  }
		]
	  }
	]
  }
var parallel_coordinate_graph_mvs2020 = {
	"$schema": "https://vega.github.io/schema/vega/v5.json",
	"title": {"text": "Account", "subtitle": "8821", "orient": "left"},
	"width":465,
	"height": 350,
	"padding": 5,
	"config": {
	  "axisY": {
		"titleX": -2,
		"titleY": 360,
		"titleAngle": -30,
		"titleAlign": "right",
		"titleBaseline": "top"
	  }
	},
	"data": [
	  {
		"name": "debit",
		"url": "https://raw.githubusercontent.com/mgmayagu/Visualization/master/data/monthly_expenses_2020.json",
		"format": {"type": "json", "parse": {"Month": "date:%Y-%m-%d"}},
		"transform": [
		  {"type": "filter", "expr": "datum.account_number == '8821'"}
		]
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
	"scales": [
	  {
		"name": "ord",
		"type": "point",
		"range": "width",
		"round": true,
		"domain": {"data": "fields", "field": "data"}
	  },
	  {
		"name": "Month",
		"type": "time",
		"range": "height",
		"nice": {"interval": "month", "step": 11},
		"reverse": true,
		"domain": {"data": "debit", "field": "Month"}
	  },
	  {
		"name": "Education",
		"type": "linear",
		"range": "height",
		"zero": false,
		"nice": true,
		"domain": {"data": "debit", "field": "Education"}
	  },
	  {
		"name": "Entertainment",
		"type": "linear",
		"range": "height",
		"zero": false,
		"nice": true,
		"domain": {"data": "debit", "field": "Entertainment"}
	  },
	  {
		"name": "Food",
		"type": "linear",
		"range": "height",
		"zero": false,
		"nice": true,
		"domain": {"data": "debit", "field": "Food"}
	  },
	  {
		"name": "Health",
		"type": "linear",
		"range": "height",
		"zero": false,
		"nice": true,
		"domain": {"data": "debit", "field": "Health"}
	  },
	  {
		"name": "Investment",
		"type": "linear",
		"range": "height",
		"zero": false,
		"nice": true,
		"domain": {"data": "debit", "field": "Investment"}
	  },
	  {
		"name": "Other",
		"type": "linear",
		"range": "height",
		"zero": false,
		"nice": true,
		"domain": {"data": "debit", "field": "Other"}
	  },
	  {
		"name": "Shopping",
		"type": "linear",
		"range": "height",
		"zero": false,
		"nice": true,
		"domain": {"data": "debit", "field": "Shopping"}
	  },
	  {
		"name": "Transportation",
		"type": "linear",
		"range": "height",
		"zero": false,
		"nice": true,
		"domain": {"data": "debit", "field": "Transportation"}
	  },
	  {
		"name": "Travel",
		"type": "linear",
		"range": "height",
		"zero": false,
		"nice": true,
		"domain": {"data": "debit", "field": "Travel"}
	  }
	],
	"axes": [
	  {
		"orient": "left",
		"zindex": 1,
		"scale": "Month",
		"title": "Month",
		"format": "%B",
		"offset": {"scale": "ord", "value": "Month", "mult": -1}
	  },
	  {
		"orient": "left",
		"zindex": 1,
		"scale": "Education",
		"title": "Education",
		"offset": {"scale": "ord", "value": "Education", "mult": -1}
	  },
	  {
		"orient": "left",
		"zindex": 1,
		"scale": "Entertainment",
		"title": "Entertainment",
		"offset": {"scale": "ord", "value": "Entertainment", "mult": -1}
	  },
	  {
		"orient": "left",
		"zindex": 1,
		"scale": "Food",
		"title": "Food",
		"offset": {"scale": "ord", "value": "Food", "mult": -1}
	  },
	  {
		"orient": "left",
		"zindex": 1,
		"scale": "Health",
		"title": "Health",
		"offset": {"scale": "ord", "value": "Health", "mult": -1}
	  },
	  {
		"orient": "left",
		"zindex": 1,
		"scale": "Investment",
		"title": "Investment",
		"offset": {"scale": "ord", "value": "Investment", "mult": -1}
	  },
	  {
		"orient": "left",
		"zindex": 1,
		"scale": "Other",
		"title": "Other",
		"offset": {"scale": "ord", "value": "Other", "mult": -1}
	  },
	  {
		"orient": "left",
		"zindex": 1,
		"scale": "Shopping",
		"title": "Shopping",
		"offset": {"scale": "ord", "value": "Shopping", "mult": -1}
	  },
	  {
		"orient": "left",
		"zindex": 1,
		"scale": "Transportation",
		"title": "Transportation",
		"offset": {"scale": "ord", "value": "Transportation", "mult": -1}
	  },
	  {
		"orient": "left",
		"zindex": 1,
		"scale": "Travel",
		"title": "Travel",
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
				"stroke": {"value": "#faa633"},
				"strokeWidth": {"value": 1.01},
				"strokeOpacity": {"value": 1}
			  }
			}
		  }
		]
	  }
	]
  }

vegaEmbed('#line_vis', line_chart_2019);
function changeLineGraph(id){
	var id = document.getElementById(id)
	// alert(id.value)
	if (id.value == "2019") {
		vegaEmbed('#line_vis', line_chart_2019);
		document.getElementById("p_line").innerHTML = "For both accounts, we can see that our spending increases towards the middle of the year, then decreases towards the end of the year. When associating the months in which we have winter, spring, and summer breaks, we can see an increase in our monthly spending. This can likely be due to the more time and freedom we as students have to go out and spend money. This will be later analyzed when looking at the categories in which we spend the most.";
		
	} else if(id.value == "2020") {
		vegaEmbed('#line_vis', line_chart_2020);
		document.getElementById("p_line").innerHTML = "For 2020, we only have data until April. Regardless, it is enough to show how drastically our spending decreased after March. This can definitely be associated with the beginning of the quarantine period due to Covid-19. Account 7157 has a more drastic decrease, but it is still evident that both accounts spent less after social distancing measures took place.";
	}
}

vegaEmbed('#both_vis', both_graphs_2019);
function changeBothGraph(id){
	var id = document.getElementById(id)
	// alert(id.value)
	if (id.value == "2019") {
		vegaEmbed('#both_vis', both_graphs_2019);

		document.getElementById("p_both").innerHTML = "The following radial plots are meant to show our spending throughout the seasons. The first radial plot shows the total spending for each season in 2019 for both accounts. The other two radial plots are labeled according to which account it is looking at. The drop-down menu can be used to analyze how much was spent for the selected category in each season. Like the other visualizations, you can hover over and click on any section of the radial plot to see the amount spent.";
	} else if(id.value == "2020") {
		vegaEmbed('#both_vis', both_graphs_2020);
		document.getElementById("p_both").innerHTML = "In comparison to 2019, we can see less spending activity from both accounts. Account 7157 previously spent the most on transportation, but in 2020 so far has spent the most on travel with an amount of $2181.10. Account 8821 spent the most on shopping, similar to 2019, with an amount of $626.43. The same trend holds true so far when it comes to each account’s spending habits for travel and investments: account 7157 doesn’t spend money on investments and account 8821 doesn’t spend money on travel.";
	}
}

vegaEmbed('#radial_vis', radial_chart_2019);
function changeRadialGraph(id){
	var id = document.getElementById(id)
	if (id.value == "2019") {
		vegaEmbed('#radial_vis', radial_chart_2019);
		document.getElementById("p_radial").innerHTML = "When looking at the overall year, we can clearly see that when added together, both accounts spend the most money in the summer. This is most likely due to the fact that we have a summer break. There are more activities for us to do, which leads to more spending. For account 7157, it is also apparent that more money is spent in the summer. For account 8821, the amount spent for summer, winter, and spring, are very close. Still, summer wins by a little over $100. For some categories like travel and investment, there are missing radial plots - this is explained in the above section (What do we spend most of our money on?).";
	} else if (id.value == "2020"){
		vegaEmbed('#radial_vis', radial_chart_2020);
		document.getElementById("p_radial").innerHTML ="FWith our 2020 data, we tried to identify how Covid-19 affected those spending patterns since the outbreak. By only looking at the rage of deviation, we can conclude that the range of spending has reduced and therefore the cluster is only at certain range. it is hard to see a clear pattern for both accounts as our spendings per category had reduced. We look forward to analyzing the entire 2020 year data and finding out whether this lifestyle transition had an effect in our spendings for a long term.";
	}
}

vegaEmbed('#parallel_vis_top', parallel_coordinate_graph_mm2019);
vegaEmbed('#parallel_vis_bottom', parallel_coordinate_graph_mvs2019);
function changeParallelGraph(id){
	var id = document.getElementById(id)
	if (id.value == "2019") {
		vegaEmbed('#parallel_vis_top', parallel_coordinate_graph_mm2019);
		vegaEmbed('#parallel_vis_bottom', parallel_coordinate_graph_mvs2019);
		document.getElementById("p_parallel").innerHTML = "To get a better insight to where our money is going, we plotted our data in the graphs above. These parallel coordinate graphs helps us finds patterns on our spendings based on different categories - Investments, Food, Entertainment, Transportation, Travel, Shopping, Health, Education, and other. For account: 7157,  the deviation of our spendings are very spread out from most of the categories, for example food, shopping and health - this pattern tells us that the spending habits of the use varies per month.  While other months the spendings are clustered at a certain range with few outliers showing a clear pattern on spending. Similarly, for account: 8821, we can clearly identify that this user has a more predictable pattern to her spendings on each category per month with few exceptions. ";

	} else if (id.value == "2020"){
		vegaEmbed('#parallel_vis_top', parallel_coordinate_graph_mm2020);
		vegaEmbed('#parallel_vis_bottom', parallel_coordinate_graph_mvs2020);
		document.getElementById("p_parallel").innerHTML = "With our 2020 data, we tried to identify how Covid-19 affected those spending patterns since the outbreak. By only looking at the rage of deviation, we can conclude that the range of spending has reduced and therefore the cluster is only at a certain range. it is hard to see a clear pattern for both accounts as our spendings per category had reduced. We look forward to analyzing the entire 2020 year data and finding out whether this lifestyle transition had an effect in our spendings for a long term.";

	}
}
var iframe = $("#iframe"); 
var newWindow = window.open(iframe.attr(src), 'Dynamic Popup', 'height=' + iframe.height() + ', width=' + iframe.width() + 'scrollbars=auto, resizable=no, location=no, status=no');
newWindow.document.write(iframe[0].outerHTML);
newWindow.document.close();
iframe[0].outerHTML = ''; // to remove iframe in page.