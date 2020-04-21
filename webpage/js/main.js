var line_chart = {
  "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
  "title": "Total Monthly Spending",
  "description": "",
  "data": {"url": "https://raw.githubusercontent.com/mgmayagu/Visualization/master/data/debit_combined.csv"},
  "mark": {
    "type": "line",
    "point": true
  },
  "width": 700,
  "height": 500,
  "encoding": {
    "x": {"title": "Month", "timeUnit": "month", "field": "transaction_date", "type": "temporal"},
    "y": {"title": "Total Spent ($)", "aggregate":"sum", "field": "transaction_amount", "type": "quantitative"},
    "color": {"field": "account_number", "type": "nominal"},
    "tooltip": {"aggregate": "sum", "field": "Transaction Amount", "type": "quantitative"}
  }
}
 
 

var both_graphs = {
  "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
  "data": {"url": "https://raw.githubusercontent.com/mgmayagu/Visualization/master/data/debit_combined.csv"},
    "transform":[
    {"filter": "datum.category != 'Earnings'"},
    {"filter": "datum.category != 'Earning'"},
    {"filter": "datum.account_number == '7157'"}
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
      "height": 355,
  
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
            "selection": "brush"
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
  
      "width": {"step": 100},
      "width": 990,
      "mark": {
        "type": "bar",
        "cursor": "pointer",
        "stroke": "black"
      },
  
      "encoding": {
        "y": {
          "field": "category",
          "type": "nominal",
          "axis": {"title": "Categories"}
        },
        "x": {
          "axis": {"title": "Amount ($)", "grid": true},
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
          "type": "nominal"
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

var scatterplot_chart = {
  "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
  "title": "Annual Spending 2019",
  "data": {"url": "https://raw.githubusercontent.com/mgmayagu/Visualization/master/data/debit_combined.csv"},
    "transform":[
    {"filter": "datum.category != 'Earnings'"},
    {"filter": "datum.category != 'Earning'"},
    {"filter": "datum.account_number == '7157'"}
  ],
  
  "selection": {
    "brush": {
      "encodings": ["x"],
      "type": "interval"}},
  
  "mark": "point",
  "width": 990,
  "height": 545,
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
        "selection": "brush"
      },
      "value": "lightgray"
    }
  }
}
 
 var radial_chart = {
  "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
  "description": "A simple radial chart with embedded data.",
  "data": { "url": "https://raw.githubusercontent.com/mgmayagu/Visualization/master/data/debit_combined.csv"},
   "transform":[
     {"filter": "datum.category != 'Earnings'"},
     {"filter": "datum.category != 'Earning'"},
     {"filter": "datum.account_number == '7157'"},
     {"filter": "datum.category == 'Food'"}
   ],
   "width": 500,
   "height": 400,
  "layer": [{
    "mark": {
      "type": "arc",
      "innerRadius": 30,
      "stroke": "#fff"}
  },{
    "mark": {
      "type": "text",
      "radiusOffset": 30},
    "encoding": {
      "text": {
        "aggregate": "sum",
        "field": "transaction_amount",
        "type": "quantitative"}
    }
  }],
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
      "scale": {"type": "sqrt", "zero": true, "range": [20, 150]}},
   "color": {
     "title": "Season",
     "field": "Season",
     "type": "nominal",
     "scale": {
       "domain": ["Winter", "Spring", "Summer", "Fall"],
       "range": ["#74a9cf", "#f768a1", "#78c679", "#fe9929"]
     }
   }
  }
}

var bar_chart = {
  "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
  "data": { "url": "https://raw.githubusercontent.com/mgmayagu/Visualization/master/data/debit_combined.csv"},
  "transform":[
    {"filter": "datum.category != 'Earnings'"},
    {"filter": "datum.category != 'Earning'"},
    {"filter": "datum.account_number == '7157'"}
  ],
  "selection": {
   "highlight": {"type": "single", "empty": "none", "on": "mouseover"},
   "select": {"type": "multi"}
  },
  "width": {"step": 30},
  "mark": {
     "type": "bar",
     "cursor": "pointer",
     "stroke": "black"
   },
  "encoding": {
   
    "y": {
      "field": "category",
      "type": "nominal",
      "axis": {"title": ""}
    },
    "x": {
      "axis": {"title": "Amount ($)", "grid": true},
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
      "type": "nominal"
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

vegaEmbed('#line_vis', line_chart);
vegaEmbed('#both_vis', both_graphs);
vegaEmbed('#scatterplot_vis', scatterplot_chart);
vegaEmbed('#radial_vis', radial_chart);
vegaEmbed('#bar_vis', bar_chart);