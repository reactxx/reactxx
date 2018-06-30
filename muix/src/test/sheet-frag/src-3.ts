const x = {
  "root": {
    ":active": {},
    "backgroundColor": "blue"
  },
  "add-ins": {
    "$mediaq": {
      "add-ins/$whenUsed/add-ins/$mediaq/root/:active/480-640/b/:hover": {
        "480-600": {
          "color": "brown"
        },
        "path": [
          "add-ins",
          "$whenUsed",
          "add-ins/$mediaq/root/:active/480-640",
          "b",
          ":hover"
        ]
      },
      "root/:active": {
        "480-640": {},
        "path": [
          "root",
          ":active"
        ]
      }
    },
    "$whenUsed": {
      "add-ins/$mediaq/root/:active/480-640": {
        "b": {
          ":hover": {
            "color": "yellow"
          }
        },
        "path": [
          "add-ins",
          "$mediaq",
          "root/:active",
          "480-640"
        ]
      }
    }
  }
}