window.NOXTELL_SCHEMA = {
 "$schema": "https://json-schema.org/draft/2020-12/schema",
 "$id": "mode.schema.json",
 "title": "A Noxtell mode file",
 "description": "Generated from the engine's declarations by the rules export. It checks structure only: the full rules check runs when the file is loaded.",
 "type": "object",
 "properties": {
  "id": {
   "type": "string",
   "pattern": "^[a-z][a-z0-9_]*$"
  },
  "version": {
   "type": "string",
   "pattern": "^[0-9]+\\.[0-9]+\\.[0-9]+$"
  },
  "schema": {
   "const": 4
  },
  "status": {
   "enum": [
    "playable",
    "planned",
    "hidden"
   ]
  },
  "players": {
   "type": "object",
   "properties": {
    "min": {
     "type": "integer",
     "minimum": 1
    },
    "max": {
     "type": "integer",
     "minimum": 1
    }
   },
   "required": [
    "min",
    "max"
   ],
   "additionalProperties": false
  },
  "styles": {
   "type": "array",
   "items": {
    "enum": [
     "seatOrder",
     "roleCall"
    ]
   },
   "minItems": 1,
   "uniqueItems": true
  },
  "defaultStyle": {
   "anyOf": [
    {
     "enum": [
      "seatOrder",
      "roleCall"
     ]
    },
    {
     "type": "object",
     "properties": {
      "seatOrderUpTo": {
       "type": "integer",
       "minimum": 1
      }
     },
     "required": [
      "seatOrderUpTo"
     ],
     "additionalProperties": false
    }
   ]
  },
  "nights": {
   "type": "object",
   "properties": {
    "upTo": {
     "type": "object",
     "propertyNames": {
      "pattern": "^[1-9][0-9]*$"
     },
     "additionalProperties": {
      "type": "integer",
      "minimum": 1
     }
    },
    "from": {
     "type": "array",
     "items": {
      "type": "array",
      "prefixItems": [
       {
        "type": "integer",
        "minimum": 1
       },
       {
        "type": "integer",
        "minimum": 1
       }
      ],
      "minItems": 2,
      "maxItems": 2
     }
    }
   },
   "additionalProperties": false,
   "oneOf": [
    {
     "required": [
      "upTo"
     ]
    },
    {
     "required": [
      "from"
     ]
    }
   ]
  },
  "kills": {
   "type": "object",
   "properties": {
    "nightOneFrom": {
     "anyOf": [
      {
       "type": "integer",
       "minimum": 1
      },
      {
       "type": "null"
      }
     ]
    },
    "twoPerNightFrom": {
     "anyOf": [
      {
       "type": "integer",
       "minimum": 1
      },
      {
       "type": "null"
      }
     ]
    }
   },
   "required": [
    "nightOneFrom"
   ],
   "additionalProperties": false
  },
  "codes": {
   "type": "object",
   "properties": {
    "seatOrder": {
     "type": "string",
     "pattern": "^[0-9A-Z]$"
    },
    "roleCall": {
     "type": "string",
     "pattern": "^[0-9A-Z]$"
    },
    "tab": {
     "type": "integer",
     "minimum": 1,
     "maximum": 31
    },
    "sim": {
     "type": "integer",
     "minimum": 0
    }
   },
   "additionalProperties": false
  },
  "tone": {
   "enum": [
    "good",
    "wolf",
    "demon",
    "cult"
   ]
  },
  "colours": {
   "type": "object",
   "properties": {
    "fg": {
     "type": "string",
     "pattern": "^#[0-9a-fA-F]{6}$"
    },
    "bg": {
     "type": "string",
     "pattern": "^#[0-9a-fA-F]{6}$"
    }
   },
   "required": [
    "fg",
    "bg"
   ],
   "additionalProperties": false
  },
  "options": {
   "type": "object",
   "properties": {
    "dawn": {
     "type": "array",
     "items": {
      "type": "string",
      "pattern": "^[a-z][a-z0-9_]*$"
     },
     "minItems": 1,
     "uniqueItems": true
    },
    "ghostPoll": {
     "type": "object",
     "properties": {
      "minVotes": {
       "type": "integer",
       "minimum": 0
      }
     },
     "required": [
      "minVotes"
     ],
     "additionalProperties": false
    },
    "ghostVotes": {
     "type": "integer",
     "minimum": 0
    },
    "execution": {
     "type": "object",
     "properties": {
      "need": {
       "enum": [
        "atLeastHalf",
        "overHalf",
        "mostVotes"
       ]
      },
      "ties": {
       "enum": [
        "none",
        "revote"
       ]
      }
     },
     "additionalProperties": false
    },
    "finalVote": {
     "type": "object",
     "properties": {
      "revotes": {
       "type": "integer",
       "minimum": 0,
       "maximum": 3
      }
     },
     "additionalProperties": false
    },
    "roles": {
     "type": "object",
     "additionalProperties": {
      "$ref": "#/$defs/roleParams"
     }
    },
    "factions": {
     "type": "object",
     "additionalProperties": {
      "$ref": "#/$defs/factionParams"
     }
    }
   },
   "additionalProperties": false
  },
  "teams": {
   "type": "array",
   "items": {
    "anyOf": [
     {
      "$ref": "#/$defs/team.village"
     },
     {
      "$ref": "#/$defs/team.evilTeam"
     },
     {
      "$ref": "#/$defs/team.cult"
     },
     {
      "$ref": "#/$defs/team.outbreakTeam"
     },
     {
      "$ref": "#/$defs/team.coven"
     }
    ]
   }
  },
  "roles": {
   "type": "array",
   "items": {
    "type": "object",
    "properties": {
     "id": {
      "type": "string",
      "pattern": "^[a-z][a-z0-9_]*$"
     },
     "team": {
      "type": "string",
      "pattern": "^[a-z][a-z0-9_]*$"
     },
     "codeBit": {
      "type": "integer",
      "minimum": 0
     },
     "pickable": {
      "type": "boolean"
     },
     "persona": {
      "enum": [
       "falseCard",
       "changingCard"
      ]
     },
     "tags": {
      "type": "array",
      "items": {
       "type": "string",
       "pattern": "^[a-z][a-zA-Z0-9_.]*$"
      },
      "uniqueItems": true
     },
     "verbs": {
      "type": "array",
      "items": {
       "$ref": "#/$defs/verbUse"
      }
     }
    },
    "required": [
     "id",
     "team"
    ],
    "additionalProperties": false
   }
  },
  "statuses": {
   "type": "array",
   "items": {
    "anyOf": [
     {
      "enum": [
       "protected",
       "mad",
       "revealed",
       "hexed",
       "infected",
       "sick",
       "fever",
       "turned",
       "possessed",
       "guarded",
       "spared",
       "cast_out",
       "trace",
       "full_strength"
      ]
     },
     {
      "$ref": "#/$defs/status.protected"
     },
     {
      "$ref": "#/$defs/status.mad"
     },
     {
      "$ref": "#/$defs/status.revealed"
     },
     {
      "$ref": "#/$defs/status.hexed"
     },
     {
      "$ref": "#/$defs/status.infected"
     },
     {
      "$ref": "#/$defs/status.sick"
     },
     {
      "$ref": "#/$defs/status.fever"
     },
     {
      "$ref": "#/$defs/status.turned"
     },
     {
      "$ref": "#/$defs/status.possessed"
     },
     {
      "$ref": "#/$defs/status.guarded"
     },
     {
      "$ref": "#/$defs/status.spared"
     },
     {
      "$ref": "#/$defs/status.cast_out"
     },
     {
      "$ref": "#/$defs/status.trace"
     },
     {
      "$ref": "#/$defs/status.full_strength"
     }
    ]
   }
  },
  "deal": {
   "anyOf": [
    {
     "$ref": "#/$defs/recipe.classicDeal"
    },
    {
     "$ref": "#/$defs/recipe.outbreakDeal"
    },
    {
     "$ref": "#/$defs/recipe.picked"
    },
    {
     "$ref": "#/$defs/recipe.basic"
    },
    {
     "$ref": "#/$defs/recipe.steps"
    },
    {
     "$ref": "#/$defs/recipe.possession"
    }
   ]
  },
  "night": {
   "type": "object",
   "properties": {
    "talk": {
     "type": "object",
     "properties": {
      "upTo": {
       "type": "object",
       "propertyNames": {
        "pattern": "^[1-9][0-9]*$"
       },
       "additionalProperties": {
        "type": "integer",
        "minimum": 1
       }
      },
      "from": {
       "type": "array",
       "items": {
        "type": "array",
        "prefixItems": [
         {
          "type": "integer",
          "minimum": 1
         },
         {
          "type": "integer",
          "minimum": 1
         }
        ],
        "minItems": 2,
        "maxItems": 2
       }
      }
     },
     "additionalProperties": false,
     "oneOf": [
      {
       "required": [
        "upTo"
       ]
      },
      {
       "required": [
        "from"
       ]
      }
     ]
    },
    "finalTalk": {
     "type": "object",
     "properties": {
      "upTo": {
       "type": "object",
       "propertyNames": {
        "pattern": "^[1-9][0-9]*$"
       },
       "additionalProperties": {
        "type": "integer",
        "minimum": 1
       }
      },
      "from": {
       "type": "array",
       "items": {
        "type": "array",
        "prefixItems": [
         {
          "type": "integer",
          "minimum": 1
         },
         {
          "type": "integer",
          "minimum": 1
         }
        ],
        "minItems": 2,
        "maxItems": 2
       }
      }
     },
     "additionalProperties": false,
     "oneOf": [
      {
       "required": [
        "upTo"
       ]
      },
      {
       "required": [
        "from"
       ]
      }
     ]
    },
    "roleCall": {
     "type": "array",
     "items": {
      "type": "object",
      "properties": {
       "team": {
        "type": "string",
        "pattern": "^[a-z][a-z0-9_]*$"
       },
       "roles": {
        "type": "array",
        "items": {
         "type": "string",
         "pattern": "^[a-z][a-z0-9_]*$"
        },
        "minItems": 1,
        "uniqueItems": true
       },
       "role": {
        "type": "string",
        "pattern": "^[a-z][a-z0-9_]*$"
       }
      },
      "additionalProperties": false
     }
    },
    "dawnCall": {
     "type": "array",
     "items": {
      "type": "string",
      "pattern": "^[a-z][a-z0-9_]*$"
     },
     "uniqueItems": true
    },
    "timing": {
     "type": "object",
     "properties": {
      "seat": {
       "type": "array",
       "prefixItems": [
        {
         "type": "number"
        },
        {
         "type": "number"
        }
       ],
       "minItems": 2,
       "maxItems": 2
      },
      "team": {
       "type": "array",
       "prefixItems": [
        {
         "type": "number"
        },
        {
         "type": "number"
        }
       ],
       "minItems": 2,
       "maxItems": 2
      },
      "dawnCallOpen": {
       "type": "array",
       "prefixItems": [
        {
         "type": "number"
        },
        {
         "type": "number"
        }
       ],
       "minItems": 2,
       "maxItems": 2
      },
      "dawnCallName": {
       "type": "array",
       "prefixItems": [
        {
         "type": "number"
        },
        {
         "type": "number"
        }
       ],
       "minItems": 2,
       "maxItems": 2
      }
     },
     "additionalProperties": false
    }
   },
   "additionalProperties": false
  },
  "levers": {
   "type": "array",
   "items": {
    "anyOf": [
     {
      "type": "object",
      "properties": {
       "id": {
        "type": "string",
        "pattern": "^[a-z][a-zA-Z0-9]*$"
       },
       "words": {
        "type": "string",
        "pattern": "^[a-z][a-zA-Z0-9_]*(\\.[a-zA-Z0-9_]+)*$"
       },
       "default": {
        "type": "boolean"
       },
       "players": {
        "type": "object",
        "properties": {
         "min": {
          "type": "integer",
          "minimum": 1
         },
         "max": {
          "type": "integer",
          "minimum": 1
         }
        },
        "required": [
         "min",
         "max"
        ],
        "additionalProperties": false
       },
       "options": {
        "type": "object",
        "properties": {
         "dawn": {
          "type": "array",
          "items": {
           "type": "string",
           "pattern": "^[a-z][a-z0-9_]*$"
          },
          "minItems": 1,
          "uniqueItems": true
         },
         "ghostPoll": {
          "type": "object",
          "properties": {
           "minVotes": {
            "type": "integer",
            "minimum": 0
           }
          },
          "required": [
           "minVotes"
          ],
          "additionalProperties": false
         },
         "ghostVotes": {
          "type": "integer",
          "minimum": 0
         },
         "execution": {
          "type": "object",
          "properties": {
           "need": {
            "enum": [
             "atLeastHalf",
             "overHalf",
             "mostVotes"
            ]
           },
           "ties": {
            "enum": [
             "none",
             "revote"
            ]
           }
          },
          "additionalProperties": false
         },
         "finalVote": {
          "type": "object",
          "properties": {
           "revotes": {
            "type": "integer",
            "minimum": 0,
            "maximum": 3
           }
          },
          "additionalProperties": false
         },
         "roles": {
          "type": "object",
          "additionalProperties": {
           "$ref": "#/$defs/roleParams"
          }
         },
         "factions": {
          "type": "object",
          "additionalProperties": {
           "$ref": "#/$defs/factionParams"
          }
         }
        },
        "additionalProperties": false
       }
      },
      "required": [
       "id",
       "words",
       "default",
       "players",
       "options"
      ],
      "additionalProperties": false
     },
     {
      "type": "object",
      "properties": {
       "id": {
        "type": "string",
        "pattern": "^[a-z][a-zA-Z0-9]*$"
       },
       "words": {
        "type": "string",
        "pattern": "^[a-z][a-zA-Z0-9_]*(\\.[a-zA-Z0-9_]+)*$"
       },
       "players": {
        "type": "object",
        "properties": {
         "min": {
          "type": "integer",
          "minimum": 1
         },
         "max": {
          "type": "integer",
          "minimum": 1
         }
        },
        "required": [
         "min",
         "max"
        ],
        "additionalProperties": false
       },
       "choices": {
        "type": "array",
        "items": {
         "type": "object",
         "properties": {
          "id": {
           "type": "string",
           "pattern": "^[a-z][a-zA-Z0-9]*$"
          },
          "words": {
           "type": "string",
           "pattern": "^[a-z][a-zA-Z0-9_]*(\\.[a-zA-Z0-9_]+)*$"
          },
          "default": {
           "type": "boolean"
          },
          "options": {
           "type": "object",
           "properties": {
            "dawn": {
             "type": "array",
             "items": {
              "type": "string",
              "pattern": "^[a-z][a-z0-9_]*$"
             },
             "minItems": 1,
             "uniqueItems": true
            },
            "ghostPoll": {
             "type": "object",
             "properties": {
              "minVotes": {
               "type": "integer",
               "minimum": 0
              }
             },
             "required": [
              "minVotes"
             ],
             "additionalProperties": false
            },
            "ghostVotes": {
             "type": "integer",
             "minimum": 0
            },
            "execution": {
             "type": "object",
             "properties": {
              "need": {
               "enum": [
                "atLeastHalf",
                "overHalf",
                "mostVotes"
               ]
              },
              "ties": {
               "enum": [
                "none",
                "revote"
               ]
              }
             },
             "additionalProperties": false
            },
            "finalVote": {
             "type": "object",
             "properties": {
              "revotes": {
               "type": "integer",
               "minimum": 0,
               "maximum": 3
              }
             },
             "additionalProperties": false
            },
            "roles": {
             "type": "object",
             "additionalProperties": {
              "$ref": "#/$defs/roleParams"
             }
            },
            "factions": {
             "type": "object",
             "additionalProperties": {
              "$ref": "#/$defs/factionParams"
             }
            }
           },
           "additionalProperties": false
          }
         },
         "required": [
          "id",
          "words",
          "options"
         ],
         "additionalProperties": false
        },
        "minItems": 2
       }
      },
      "required": [
       "id",
       "words",
       "players",
       "choices"
      ],
      "additionalProperties": false
     }
    ]
   }
  }
 },
 "required": [
  "id",
  "version",
  "schema",
  "status",
  "codes"
 ],
 "additionalProperties": false,
 "$defs": {
  "condition": {
   "anyOf": [
    {
     "enum": [
      "always",
      "outbreakPossible",
      "killNight",
      "lastNight"
     ]
    },
    {
     "type": "object",
     "minProperties": 1,
     "maxProperties": 1,
     "properties": {
      "all": {
       "type": "array",
       "items": {
        "$ref": "#/$defs/condition"
       },
       "minItems": 1
      },
      "any": {
       "type": "array",
       "items": {
        "$ref": "#/$defs/condition"
       },
       "minItems": 1
      },
      "not": {
       "$ref": "#/$defs/condition"
      },
      "night": {
       "type": "object",
       "properties": {
        "from": {
         "anyOf": [
          {
           "type": "integer",
           "minimum": 1
          },
          {
           "type": "object",
           "properties": {
            "param": {
             "type": "string",
             "pattern": "^[a-z][a-zA-Z0-9]*$"
            }
           },
           "required": [
            "param"
           ],
           "additionalProperties": false
          }
         ]
        }
       },
       "required": [
        "from"
       ],
       "additionalProperties": false
      },
      "size": {
       "type": "object",
       "properties": {
        "from": {
         "type": "integer",
         "minimum": 1
        },
        "to": {
         "type": "integer",
         "minimum": 1
        }
       },
       "additionalProperties": false
      },
      "param": {
       "type": "string",
       "pattern": "^[a-z][a-zA-Z0-9]*$"
      }
     },
     "additionalProperties": false
    }
   ]
  },
  "factionParams": {
   "type": "object",
   "properties": {
    "leaderFromNight": {
     "anyOf": [
      {
       "type": "integer",
       "minimum": 1
      },
      {
       "type": "object",
       "propertyNames": {
        "pattern": "^[1-9][0-9]*$"
       },
       "additionalProperties": {
        "anyOf": [
         {
          "type": "integer",
          "minimum": 1
         },
         {
          "type": "null"
         }
        ]
       }
      }
     ]
    },
    "leaderNamedWithNight": {
     "type": "boolean"
    },
    "leaderSuccessionBeforeNight": {
     "anyOf": [
      {
       "type": "integer",
       "minimum": 1
      },
      {
       "type": "object",
       "propertyNames": {
        "pattern": "^[1-9][0-9]*$"
       },
       "additionalProperties": {
        "anyOf": [
         {
          "type": "integer",
          "minimum": 1
         },
         {
          "type": "null"
         }
        ]
       }
      }
     ]
    },
    "alsoKills": {
     "enum": [
      "none",
      "steer",
      "newHostPick"
     ]
    },
    "alsoKillsFrom": {
     "anyOf": [
      {
       "enum": [
        "last"
       ]
      },
      {
       "type": "integer",
       "minimum": 1
      },
      {
       "type": "object",
       "propertyNames": {
        "pattern": "^[1-9][0-9]*$"
       },
       "additionalProperties": {
        "anyOf": [
         {
          "type": "integer",
          "minimum": 1
         },
         {
          "type": "null"
         }
        ]
       }
      }
     ]
    },
    "attack": {
     "enum": [
      "perOutbreak",
      "afterFirstOutbreak",
      "nightly"
     ]
    },
    "attackBy": {
     "enum": [
      "team",
      "turned"
     ]
    },
    "outbreakAfter": {
     "type": "integer",
     "minimum": 0
    },
    "checks": {
     "anyOf": [
      {
       "type": "integer",
       "minimum": 0
      },
      {
       "type": "object",
       "propertyNames": {
        "pattern": "^[1-9][0-9]*$"
       },
       "additionalProperties": {
        "anyOf": [
         {
          "type": "integer",
          "minimum": 0
         },
         {
          "type": "null"
         }
        ]
       }
      }
     ]
    },
    "curesSick": {
     "type": "boolean"
    },
    "disguises": {
     "type": "integer",
     "minimum": 0
    },
    "everyNight": {
     "type": "boolean"
    },
    "fakeRole": {
     "type": "boolean"
    },
    "feedback": {
     "anyOf": [
      {
       "type": "boolean"
      },
      {
       "anyOf": [
        {
         "type": "boolean"
        },
        {
         "type": "object",
         "propertyNames": {
          "pattern": "^[1-9][0-9]*$"
         },
         "additionalProperties": {
          "anyOf": [
           {
            "type": "boolean"
           },
           {
            "type": "null"
           }
          ]
         }
        }
       ]
      }
     ]
    },
    "fever": {
     "anyOf": [
      {
       "type": "boolean"
      },
      {
       "anyOf": [
        {
         "type": "integer",
         "minimum": 0
        },
        {
         "type": "object",
         "propertyNames": {
          "pattern": "^[1-9][0-9]*$"
         },
         "additionalProperties": {
          "anyOf": [
           {
            "type": "integer",
            "minimum": 0
           },
           {
            "type": "null"
           }
          ]
         }
        }
       ]
      }
     ]
    },
    "fevers": {
     "type": "boolean"
    },
    "fleeTo": {
     "enum": [
      "neighbour",
      "anywhere"
     ]
    },
    "fragments": {
     "enum": [
      "seat",
      "either",
      "pair"
     ]
    },
    "fromNight": {
     "anyOf": [
      {
       "type": "integer",
       "minimum": 1
      },
      {
       "type": "object",
       "propertyNames": {
        "pattern": "^[1-9][0-9]*$"
       },
       "additionalProperties": {
        "anyOf": [
         {
          "type": "integer",
          "minimum": 1
         },
         {
          "type": "null"
         }
        ]
       }
      }
     ]
    },
    "turnedGhostVote": {
     "type": "boolean"
    },
    "turnedGhostVotes": {
     "type": "integer",
     "minimum": 0
    },
    "turnedLearnTeam": {
     "type": "boolean"
    },
    "hostActs": {
     "type": "boolean"
    },
    "hosts": {
     "type": "object",
     "properties": {
      "fromNight": {
       "type": "integer",
       "minimum": 1
      },
      "count": {
       "type": "integer",
       "minimum": 1
      }
     },
     "required": [
      "fromNight",
      "count"
     ],
     "additionalProperties": false
    },
    "minAlive": {
     "type": "integer",
     "minimum": 0
    },
    "minDead": {
     "type": "integer",
     "minimum": 1
    },
    "onOutbreak": {
     "type": "boolean"
    },
    "onFinalVote": {
     "type": "boolean"
    },
    "parity": {
     "type": "boolean"
    },
    "pick": {
     "type": "boolean"
    },
    "quietDaysShorten": {
     "type": "boolean"
    },
    "reads": {
     "enum": [
      "was",
      "now"
     ]
    },
    "sickAfter": {
     "type": "integer",
     "minimum": 0
    },
    "sickVote": {
     "type": "boolean"
    },
    "spareCult": {
     "type": "boolean"
    },
    "steerMoves": {
     "enum": [
      "first",
      "last"
     ]
    },
    "stopsShots": {
     "type": "boolean"
    },
    "strikes": {
     "type": "integer",
     "minimum": 1
    },
    "strikesShared": {
     "type": "boolean"
    },
    "successionBeforeNight": {
     "anyOf": [
      {
       "type": "integer",
       "minimum": 1
      },
      {
       "type": "object",
       "propertyNames": {
        "pattern": "^[1-9][0-9]*$"
       },
       "additionalProperties": {
        "anyOf": [
         {
          "type": "integer",
          "minimum": 1
         },
         {
          "type": "null"
         }
        ]
       }
      }
     ]
    },
    "tells": {
     "enum": [
      "pick",
      "window"
     ]
    },
    "unguardedFrom": {
     "anyOf": [
      {
       "enum": [
        "last"
       ]
      },
      {
       "type": "integer",
       "minimum": 1
      },
      {
       "type": "object",
       "propertyNames": {
        "pattern": "^[1-9][0-9]*$"
       },
       "additionalProperties": {
        "anyOf": [
         {
          "type": "integer",
          "minimum": 1
         },
         {
          "type": "null"
         }
        ]
       }
      }
     ]
    },
    "until": {
     "enum": [
      "nextDawn",
      "nextDusk"
     ]
    },
    "uses": {
     "anyOf": [
      {
       "type": "integer",
       "minimum": 0
      },
      {
       "type": "object",
       "propertyNames": {
        "pattern": "^[1-9][0-9]*$"
       },
       "additionalProperties": {
        "anyOf": [
         {
          "type": "integer",
          "minimum": 0
         },
         {
          "type": "null"
         }
        ]
       }
      }
     ]
    },
    "usesPerGame": {
     "type": "integer",
     "minimum": 0
    },
    "vote": {
     "type": "boolean"
    },
    "voteWeight": {
     "type": "integer",
     "minimum": 1
    },
    "win": {
     "enum": [
      "halfOverrides",
      "leaderSurvivesOverrides",
      "leaderSurvivesShares",
      "withAllies"
     ]
    },
    "window": {
     "anyOf": [
      {
       "type": "integer",
       "minimum": 1
      },
      {
       "type": "object",
       "propertyNames": {
        "pattern": "^[1-9][0-9]*$"
       },
       "additionalProperties": {
        "anyOf": [
         {
          "anyOf": [
           {
            "type": "integer",
            "minimum": 1
           },
           {
            "type": "object",
            "properties": {
             "left": {
              "type": "integer",
              "minimum": 0
             },
             "right": {
              "type": "integer",
              "minimum": 0
             }
            },
            "required": [
             "left",
             "right"
            ],
            "additionalProperties": false
           }
          ]
         },
         {
          "type": "null"
         }
        ]
       }
      }
     ]
    }
   },
   "additionalProperties": false
  },
  "recipe.basic": {
   "type": "object",
   "properties": {
    "recipe": {
     "const": "basic"
    },
    "evil": {
     "type": "object",
     "properties": {
      "leader": {
       "type": "string",
       "pattern": "^[a-z][a-z0-9_]*$"
      },
      "fill": {
       "type": "string",
       "pattern": "^[a-z][a-z0-9_]*$"
      },
      "from": {
       "type": "array",
       "items": {
        "type": "array",
        "prefixItems": [
         {
          "type": "integer",
          "minimum": 1
         },
         {
          "type": "integer",
          "minimum": 0
         }
        ],
        "minItems": 2,
        "maxItems": 2
       }
      }
     },
     "required": [
      "leader",
      "from"
     ],
     "additionalProperties": false
    }
   },
   "additionalProperties": false,
   "required": [
    "recipe"
   ]
  },
  "recipe.classicDeal": {
   "type": "object",
   "properties": {
    "recipe": {
     "enum": [
      "classicDeal"
     ]
    },
    "evil": {
     "type": "object",
     "properties": {
      "leader": {
       "type": "string",
       "pattern": "^[a-z][a-z0-9_]*$"
      },
      "fill": {
       "type": "string",
       "pattern": "^[a-z][a-z0-9_]*$"
      },
      "from": {
       "type": "array",
       "items": {
        "type": "array",
        "prefixItems": [
         {
          "type": "integer",
          "minimum": 1
         },
         {
          "type": "integer",
          "minimum": 0
         }
        ],
        "minItems": 2,
        "maxItems": 2
       }
      }
     },
     "required": [
      "leader",
      "from"
     ],
     "additionalProperties": false
    },
    "helpers": {
     "type": "object",
     "properties": {
      "draw": {
       "enum": [
        "random",
        "inOrder"
       ]
      },
      "pool": {
       "type": "array",
       "items": {
        "type": "string",
        "pattern": "^[a-z][a-z0-9_]*$"
       },
       "uniqueItems": true
      }
     },
     "required": [
      "pool"
     ],
     "additionalProperties": false
    },
    "burnHelpers": {
     "anyOf": [
      {
       "type": "integer",
       "minimum": 1
      },
      {
       "type": "array",
       "items": {
        "type": "string",
        "pattern": "^[a-z][a-z0-9_]*$"
       },
       "uniqueItems": true
      }
     ]
    },
    "thirdParty": {
     "type": "object",
     "properties": {
      "role": {
       "type": "string",
       "pattern": "^[a-z][a-z0-9_]*$"
      },
      "from": {
       "type": "integer",
       "minimum": 1
      }
     },
     "required": [
      "role",
      "from"
     ],
     "additionalProperties": false
    },
    "good": {
     "type": "object",
     "properties": {
      "always": {
       "type": "array",
       "items": {
        "type": "string",
        "pattern": "^[a-z][a-z0-9_]*$"
       },
       "uniqueItems": true
      },
      "drawn": {
       "type": "object",
       "properties": {
        "from": {
         "type": "array",
         "items": {
          "type": "string",
          "pattern": "^[a-z][a-z0-9_]*$"
         },
         "uniqueItems": true
        },
        "take": {
         "type": "integer",
         "minimum": 0
        }
       },
       "required": [
        "from",
        "take"
       ],
       "additionalProperties": false
      },
      "extra": {
       "type": "array",
       "items": {
        "anyOf": [
         {
          "type": "object",
          "properties": {
           "oneOf": {
            "type": "array",
            "items": {
             "type": "string",
             "pattern": "^[a-z][a-z0-9_]*$"
            },
            "minItems": 1,
            "uniqueItems": true
           },
           "bothFrom": {
            "type": "integer",
            "minimum": 1
           }
          },
          "required": [
           "oneOf"
          ],
          "additionalProperties": false
         },
         {
          "type": "object",
          "properties": {
           "role": {
            "type": "string",
            "pattern": "^[a-z][a-z0-9_]*$"
           },
           "from": {
            "type": "integer",
            "minimum": 1
           }
          },
          "required": [
           "role"
          ],
          "additionalProperties": false
         }
        ]
       }
      },
      "caps": {
       "type": "array",
       "items": {
        "type": "array",
        "prefixItems": [
         {
          "type": "integer",
          "minimum": 1
         },
         {
          "type": "integer",
          "minimum": 0
         }
        ],
        "minItems": 2,
        "maxItems": 2
       }
      },
      "villagersForUndisguised": {
       "type": "boolean"
      },
      "child": {
       "anyOf": [
        {
         "const": false
        },
        {
         "type": "object",
         "properties": {
          "role": {
           "type": "string",
           "pattern": "^[a-z][a-z0-9_]*$"
          },
          "from": {
           "type": "integer",
           "minimum": 1
          },
          "chance": {
           "type": "number"
          }
         },
         "required": [
          "role",
          "from"
         ],
         "additionalProperties": false
        }
       ]
      },
      "fill": {
       "type": "string",
       "pattern": "^[a-z][a-z0-9_]*$"
      }
     },
     "additionalProperties": false
    },
    "picked": {
     "type": "object",
     "propertyNames": {
      "pattern": "^[1-9][0-9]*$"
     },
     "additionalProperties": {
      "type": "array",
      "items": {
       "type": "string",
       "pattern": "^[a-z][a-z0-9_]*$"
      }
     }
    },
    "disguises": {
     "type": "object",
     "properties": {
      "pool": {
       "type": "array",
       "items": {
        "type": "string",
        "pattern": "^[a-z][a-z0-9_]*$"
       },
       "uniqueItems": true
      },
      "max": {
       "type": "integer",
       "minimum": 0
      },
      "offWhenPicked": {
       "type": "array",
       "items": {
        "type": "string",
        "pattern": "^[a-z][a-z0-9_]*$"
       }
      }
     },
     "additionalProperties": false
    },
    "fakeRoles": {
     "type": "array",
     "items": {
      "type": "string",
      "pattern": "^[a-z][a-z0-9_]*$"
     },
     "uniqueItems": true
    }
   },
   "additionalProperties": false,
   "required": [
    "recipe"
   ]
  },
  "recipe.outbreakDeal": {
   "type": "object",
   "properties": {
    "recipe": {
     "enum": [
      "outbreakDeal"
     ]
    },
    "from": {
     "type": "integer",
     "minimum": 1
    },
    "evil": {
     "type": "object",
     "properties": {
      "leader": {
       "type": "string",
       "pattern": "^[a-z][a-z0-9_]*$"
      },
      "fill": {
       "type": "string",
       "pattern": "^[a-z][a-z0-9_]*$"
      },
      "from": {
       "type": "array",
       "items": {
        "type": "array",
        "prefixItems": [
         {
          "type": "integer",
          "minimum": 1
         },
         {
          "type": "integer",
          "minimum": 0
         }
        ],
        "minItems": 2,
        "maxItems": 2
       }
      }
     },
     "required": [
      "leader",
      "from"
     ],
     "additionalProperties": false
    },
    "helpers": {
     "type": "object",
     "properties": {
      "draw": {
       "enum": [
        "random",
        "inOrder"
       ]
      },
      "pool": {
       "type": "array",
       "items": {
        "type": "string",
        "pattern": "^[a-z][a-z0-9_]*$"
       },
       "uniqueItems": true
      }
     },
     "required": [
      "pool"
     ],
     "additionalProperties": false
    },
    "good": {
     "type": "object",
     "properties": {
      "always": {
       "type": "array",
       "items": {
        "type": "string",
        "pattern": "^[a-z][a-z0-9_]*$"
       },
       "uniqueItems": true
      },
      "drawn": {
       "type": "object",
       "properties": {
        "from": {
         "type": "array",
         "items": {
          "type": "string",
          "pattern": "^[a-z][a-z0-9_]*$"
         },
         "uniqueItems": true
        },
        "take": {
         "type": "integer",
         "minimum": 0
        }
       },
       "required": [
        "from",
        "take"
       ],
       "additionalProperties": false
      },
      "extra": {
       "type": "array",
       "items": {
        "anyOf": [
         {
          "type": "object",
          "properties": {
           "oneOf": {
            "type": "array",
            "items": {
             "type": "string",
             "pattern": "^[a-z][a-z0-9_]*$"
            },
            "minItems": 1,
            "uniqueItems": true
           },
           "bothFrom": {
            "type": "integer",
            "minimum": 1
           }
          },
          "required": [
           "oneOf"
          ],
          "additionalProperties": false
         },
         {
          "type": "object",
          "properties": {
           "role": {
            "type": "string",
            "pattern": "^[a-z][a-z0-9_]*$"
           },
           "from": {
            "type": "integer",
            "minimum": 1
           }
          },
          "required": [
           "role"
          ],
          "additionalProperties": false
         }
        ]
       }
      },
      "caps": {
       "type": "array",
       "items": {
        "type": "array",
        "prefixItems": [
         {
          "type": "integer",
          "minimum": 1
         },
         {
          "type": "integer",
          "minimum": 0
         }
        ],
        "minItems": 2,
        "maxItems": 2
       }
      },
      "villagersForUndisguised": {
       "type": "boolean"
      },
      "child": {
       "anyOf": [
        {
         "const": false
        },
        {
         "type": "object",
         "properties": {
          "role": {
           "type": "string",
           "pattern": "^[a-z][a-z0-9_]*$"
          },
          "from": {
           "type": "integer",
           "minimum": 1
          },
          "chance": {
           "type": "number"
          }
         },
         "required": [
          "role",
          "from"
         ],
         "additionalProperties": false
        }
       ]
      },
      "fill": {
       "type": "string",
       "pattern": "^[a-z][a-z0-9_]*$"
      }
     },
     "additionalProperties": false
    },
    "picked": {
     "type": "object",
     "propertyNames": {
      "pattern": "^[1-9][0-9]*$"
     },
     "additionalProperties": {
      "type": "array",
      "items": {
       "type": "string",
       "pattern": "^[a-z][a-z0-9_]*$"
      }
     }
    },
    "disguises": {
     "type": "object",
     "properties": {
      "pool": {
       "type": "array",
       "items": {
        "type": "string",
        "pattern": "^[a-z][a-z0-9_]*$"
       },
       "uniqueItems": true
      },
      "max": {
       "type": "integer",
       "minimum": 0
      },
      "offWhenPicked": {
       "type": "array",
       "items": {
        "type": "string",
        "pattern": "^[a-z][a-z0-9_]*$"
       }
      }
     },
     "additionalProperties": false
    },
    "fakeRoles": {
     "type": "array",
     "items": {
      "type": "string",
      "pattern": "^[a-z][a-z0-9_]*$"
     },
     "uniqueItems": true
    }
   },
   "additionalProperties": false,
   "required": [
    "recipe"
   ]
  },
  "recipe.picked": {
   "type": "object",
   "properties": {
    "recipe": {
     "const": "picked"
    },
    "evil": {
     "type": "object",
     "properties": {
      "leader": {
       "type": "string",
       "pattern": "^[a-z][a-z0-9_]*$"
      },
      "fill": {
       "type": "string",
       "pattern": "^[a-z][a-z0-9_]*$"
      },
      "from": {
       "type": "array",
       "items": {
        "type": "array",
        "prefixItems": [
         {
          "type": "integer",
          "minimum": 1
         },
         {
          "type": "integer",
          "minimum": 0
         }
        ],
        "minItems": 2,
        "maxItems": 2
       }
      }
     },
     "required": [
      "leader",
      "from"
     ],
     "additionalProperties": false
    },
    "helpers": {
     "type": "object",
     "properties": {
      "draw": {
       "enum": [
        "random",
        "inOrder"
       ]
      },
      "pool": {
       "type": "array",
       "items": {
        "type": "string",
        "pattern": "^[a-z][a-z0-9_]*$"
       },
       "uniqueItems": true
      }
     },
     "required": [
      "pool"
     ],
     "additionalProperties": false
    },
    "picked": {
     "type": "object",
     "propertyNames": {
      "pattern": "^[1-9][0-9]*$"
     },
     "additionalProperties": {
      "type": "array",
      "items": {
       "type": "string",
       "pattern": "^[a-z][a-z0-9_]*$"
      }
     }
    }
   },
   "additionalProperties": false,
   "required": [
    "recipe"
   ]
  },
  "recipe.possession": {
   "type": "object",
   "properties": {
    "recipe": {
     "const": "possession"
    },
    "evil": {
     "type": "object",
     "properties": {
      "leader": {
       "type": "string",
       "pattern": "^[a-z][a-z0-9_]*$"
      },
      "from": {
       "type": "array",
       "items": {
        "type": "array",
        "prefixItems": [
         {
          "type": "integer",
          "minimum": 1
         },
         {
          "type": "integer",
          "minimum": 1
         }
        ],
        "minItems": 2,
        "maxItems": 2
       }
      }
     },
     "required": [
      "leader",
      "from"
     ],
     "additionalProperties": false
    },
    "cultPool": {
     "type": "array",
     "items": {
      "type": "string",
      "pattern": "^[a-z][a-z0-9_]*$"
     },
     "uniqueItems": true
    },
    "good": {
     "type": "array",
     "items": {
      "type": "array",
      "prefixItems": [
       {
        "type": "string",
        "pattern": "^[a-z][a-z0-9_]*$"
       },
       {
        "type": "integer",
        "minimum": 1
       }
      ],
      "minItems": 2,
      "maxItems": 2
     }
    },
    "trickster": {
     "type": "integer",
     "minimum": 1
    }
   },
   "additionalProperties": false,
   "required": [
    "recipe"
   ]
  },
  "recipe.steps": {
   "type": "object",
   "properties": {
    "recipe": {
     "const": "steps"
    },
    "evil": {
     "type": "object",
     "properties": {
      "leader": {
       "type": "string",
       "pattern": "^[a-z][a-z0-9_]*$"
      },
      "fill": {
       "type": "string",
       "pattern": "^[a-z][a-z0-9_]*$"
      },
      "from": {
       "type": "array",
       "items": {
        "type": "array",
        "prefixItems": [
         {
          "type": "integer",
          "minimum": 1
         },
         {
          "type": "integer",
          "minimum": 0
         }
        ],
        "minItems": 2,
        "maxItems": 2
       }
      },
      "pool": {
       "type": "array",
       "items": {
        "type": "string",
        "pattern": "^[a-z][a-z0-9_]*$"
       },
       "uniqueItems": true
      },
      "draw": {
       "enum": [
        "random",
        "inOrder"
       ]
      }
     },
     "required": [
      "leader",
      "from"
     ],
     "additionalProperties": false
    },
    "good": {
     "type": "object",
     "properties": {
      "always": {
       "type": "array",
       "items": {
        "type": "string",
        "pattern": "^[a-z][a-z0-9_]*$"
       },
       "uniqueItems": true
      },
      "drawn": {
       "type": "object",
       "properties": {
        "from": {
         "type": "array",
         "items": {
          "type": "string",
          "pattern": "^[a-z][a-z0-9_]*$"
         },
         "uniqueItems": true
        },
        "take": {
         "type": "integer",
         "minimum": 0
        }
       },
       "required": [
        "from",
        "take"
       ],
       "additionalProperties": false
      },
      "extra": {
       "type": "array",
       "items": {
        "anyOf": [
         {
          "type": "object",
          "properties": {
           "oneOf": {
            "type": "array",
            "items": {
             "type": "string",
             "pattern": "^[a-z][a-z0-9_]*$"
            },
            "minItems": 1,
            "uniqueItems": true
           },
           "bothFrom": {
            "type": "integer",
            "minimum": 1
           }
          },
          "required": [
           "oneOf"
          ],
          "additionalProperties": false
         },
         {
          "type": "object",
          "properties": {
           "role": {
            "type": "string",
            "pattern": "^[a-z][a-z0-9_]*$"
           },
           "from": {
            "type": "integer",
            "minimum": 1
           }
          },
          "required": [
           "role"
          ],
          "additionalProperties": false
         }
        ]
       }
      },
      "caps": {
       "type": "array",
       "items": {
        "type": "array",
        "prefixItems": [
         {
          "type": "integer",
          "minimum": 1
         },
         {
          "type": "integer",
          "minimum": 0
         }
        ],
        "minItems": 2,
        "maxItems": 2
       }
      },
      "child": {
       "anyOf": [
        {
         "const": false
        },
        {
         "type": "object",
         "properties": {
          "role": {
           "type": "string",
           "pattern": "^[a-z][a-z0-9_]*$"
          },
          "from": {
           "type": "integer",
           "minimum": 1
          },
          "chance": {
           "type": "number"
          }
         },
         "required": [
          "role",
          "from"
         ],
         "additionalProperties": false
        }
       ]
      },
      "fill": {
       "type": "string",
       "pattern": "^[a-z][a-z0-9_]*$"
      },
      "bySize": {
       "type": "array",
       "items": {
        "type": "array",
        "prefixItems": [
         {
          "type": "integer",
          "minimum": 1
         },
         {
          "type": "array",
          "items": {
           "type": "string",
           "pattern": "^[a-z][a-z0-9_]*$"
          },
          "uniqueItems": true
         }
        ],
        "minItems": 2,
        "maxItems": 2
       }
      }
     },
     "additionalProperties": false
    },
    "thirdParty": {
     "type": "object",
     "properties": {
      "role": {
       "type": "string",
       "pattern": "^[a-z][a-z0-9_]*$"
      },
      "from": {
       "type": "integer",
       "minimum": 1
      }
     },
     "required": [
      "role",
      "from"
     ],
     "additionalProperties": false
    },
    "villagerFloor": {
     "anyOf": [
      {
       "type": "integer",
       "minimum": 0
      },
      {
       "type": "array",
       "items": {
        "type": "array",
        "prefixItems": [
         {
          "type": "integer",
          "minimum": 1
         },
         {
          "type": "integer",
          "minimum": 0
         }
        ],
        "minItems": 2,
        "maxItems": 2
       }
      }
     ]
    }
   },
   "additionalProperties": false,
   "required": [
    "recipe"
   ]
  },
  "roleParams": {
   "type": "object",
   "properties": {
    "leaderFromNight": {
     "anyOf": [
      {
       "type": "integer",
       "minimum": 1
      },
      {
       "type": "object",
       "propertyNames": {
        "pattern": "^[1-9][0-9]*$"
       },
       "additionalProperties": {
        "anyOf": [
         {
          "type": "integer",
          "minimum": 1
         },
         {
          "type": "null"
         }
        ]
       }
      }
     ]
    },
    "leaderNamedWithNight": {
     "type": "boolean"
    },
    "leaderSuccessionBeforeNight": {
     "anyOf": [
      {
       "type": "integer",
       "minimum": 1
      },
      {
       "type": "object",
       "propertyNames": {
        "pattern": "^[1-9][0-9]*$"
       },
       "additionalProperties": {
        "anyOf": [
         {
          "type": "integer",
          "minimum": 1
         },
         {
          "type": "null"
         }
        ]
       }
      }
     ]
    },
    "attack": {
     "enum": [
      "perOutbreak",
      "afterFirstOutbreak",
      "nightly"
     ]
    },
    "attackBy": {
     "enum": [
      "team",
      "turned"
     ]
    },
    "outbreakAfter": {
     "type": "integer",
     "minimum": 0
    },
    "checks": {
     "anyOf": [
      {
       "type": "integer",
       "minimum": 0
      },
      {
       "type": "object",
       "propertyNames": {
        "pattern": "^[1-9][0-9]*$"
       },
       "additionalProperties": {
        "anyOf": [
         {
          "type": "integer",
          "minimum": 0
         },
         {
          "type": "null"
         }
        ]
       }
      }
     ]
    },
    "curesSick": {
     "type": "boolean"
    },
    "everyNight": {
     "type": "boolean"
    },
    "fakeRole": {
     "type": "boolean"
    },
    "feedback": {
     "anyOf": [
      {
       "type": "boolean"
      },
      {
       "anyOf": [
        {
         "type": "boolean"
        },
        {
         "type": "object",
         "propertyNames": {
          "pattern": "^[1-9][0-9]*$"
         },
         "additionalProperties": {
          "anyOf": [
           {
            "type": "boolean"
           },
           {
            "type": "null"
           }
          ]
         }
        }
       ]
      }
     ]
    },
    "fever": {
     "anyOf": [
      {
       "type": "boolean"
      },
      {
       "anyOf": [
        {
         "type": "integer",
         "minimum": 0
        },
        {
         "type": "object",
         "propertyNames": {
          "pattern": "^[1-9][0-9]*$"
         },
         "additionalProperties": {
          "anyOf": [
           {
            "type": "integer",
            "minimum": 0
           },
           {
            "type": "null"
           }
          ]
         }
        }
       ]
      }
     ]
    },
    "fevers": {
     "type": "boolean"
    },
    "fragments": {
     "enum": [
      "seat",
      "either",
      "pair"
     ]
    },
    "fromNight": {
     "anyOf": [
      {
       "type": "integer",
       "minimum": 1
      },
      {
       "type": "object",
       "propertyNames": {
        "pattern": "^[1-9][0-9]*$"
       },
       "additionalProperties": {
        "anyOf": [
         {
          "type": "integer",
          "minimum": 1
         },
         {
          "type": "null"
         }
        ]
       }
      }
     ]
    },
    "maddensFrom": {
     "type": "integer",
     "minimum": 1
    },
    "maddensWhenImpaired": {
     "type": "boolean"
    },
    "minAlive": {
     "type": "integer",
     "minimum": 0
    },
    "minDead": {
     "type": "integer",
     "minimum": 1
    },
    "module": {
     "type": "boolean"
    },
    "onOutbreak": {
     "type": "boolean"
    },
    "onFinalVote": {
     "type": "boolean"
    },
    "pick": {
     "type": "boolean"
    },
    "reads": {
     "enum": [
      "was",
      "now"
     ]
    },
    "sickAfter": {
     "type": "integer",
     "minimum": 0
    },
    "stopsShots": {
     "type": "boolean"
    },
    "strikes": {
     "type": "integer",
     "minimum": 1
    },
    "tells": {
     "enum": [
      "pick",
      "window"
     ]
    },
    "unique": {
     "type": "boolean"
    },
    "until": {
     "enum": [
      "nextDawn",
      "nextDusk"
     ]
    },
    "uses": {
     "anyOf": [
      {
       "type": "integer",
       "minimum": 0
      },
      {
       "type": "object",
       "propertyNames": {
        "pattern": "^[1-9][0-9]*$"
       },
       "additionalProperties": {
        "anyOf": [
         {
          "type": "integer",
          "minimum": 0
         },
         {
          "type": "null"
         }
        ]
       }
      }
     ]
    },
    "usesPerGame": {
     "type": "integer",
     "minimum": 0
    },
    "vote": {
     "type": "boolean"
    },
    "voteWeight": {
     "type": "integer",
     "minimum": 1
    },
    "window": {
     "anyOf": [
      {
       "type": "integer",
       "minimum": 1
      },
      {
       "type": "object",
       "propertyNames": {
        "pattern": "^[1-9][0-9]*$"
       },
       "additionalProperties": {
        "anyOf": [
         {
          "anyOf": [
           {
            "type": "integer",
            "minimum": 1
           },
           {
            "type": "object",
            "properties": {
             "left": {
              "type": "integer",
              "minimum": 0
             },
             "right": {
              "type": "integer",
              "minimum": 0
             }
            },
            "required": [
             "left",
             "right"
            ],
            "additionalProperties": false
           }
          ]
         },
         {
          "type": "null"
         }
        ]
       }
      }
     ]
    }
   },
   "additionalProperties": false
  },
  "status.cast_out": {
   "type": "object",
   "properties": {
    "status": {
     "const": "cast_out"
    }
   },
   "additionalProperties": false,
   "required": [
    "status"
   ]
  },
  "status.fever": {
   "type": "object",
   "properties": {
    "status": {
     "const": "fever"
    },
    "timelineOf": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*$"
    },
    "at": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*$"
    }
   },
   "additionalProperties": false,
   "required": [
    "status"
   ]
  },
  "status.full_strength": {
   "type": "object",
   "properties": {
    "status": {
     "const": "full_strength"
    }
   },
   "additionalProperties": false,
   "required": [
    "status"
   ]
  },
  "status.guarded": {
   "type": "object",
   "properties": {
    "status": {
     "const": "guarded"
    }
   },
   "additionalProperties": false,
   "required": [
    "status"
   ]
  },
  "status.hexed": {
   "type": "object",
   "properties": {
    "status": {
     "enum": [
      "hexed"
     ]
    }
   },
   "additionalProperties": false,
   "required": [
    "status"
   ]
  },
  "status.infected": {
   "type": "object",
   "properties": {
    "status": {
     "enum": [
      "infected"
     ]
    },
    "timelineOf": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*$"
    },
    "at": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*$"
    }
   },
   "additionalProperties": false,
   "required": [
    "status"
   ]
  },
  "status.mad": {
   "type": "object",
   "properties": {
    "status": {
     "const": "mad"
    }
   },
   "additionalProperties": false,
   "required": [
    "status"
   ]
  },
  "status.possessed": {
   "type": "object",
   "properties": {
    "status": {
     "const": "possessed"
    }
   },
   "additionalProperties": false,
   "required": [
    "status"
   ]
  },
  "status.protected": {
   "type": "object",
   "properties": {
    "status": {
     "const": "protected"
    },
    "stops": {
     "type": "array",
     "items": {
      "enum": [
       "kill.night",
       "kill.execution",
       "kill.finalVote",
       "kill.burst",
       "recruit",
       "mark"
      ]
     },
     "uniqueItems": true
    }
   },
   "additionalProperties": false,
   "required": [
    "status"
   ]
  },
  "status.revealed": {
   "type": "object",
   "properties": {
    "status": {
     "const": "revealed"
    }
   },
   "additionalProperties": false,
   "required": [
    "status"
   ]
  },
  "status.sick": {
   "type": "object",
   "properties": {
    "status": {
     "const": "sick"
    },
    "timelineOf": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*$"
    },
    "at": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*$"
    }
   },
   "additionalProperties": false,
   "required": [
    "status"
   ]
  },
  "status.spared": {
   "type": "object",
   "properties": {
    "status": {
     "const": "spared"
    }
   },
   "additionalProperties": false,
   "required": [
    "status"
   ]
  },
  "status.trace": {
   "type": "object",
   "properties": {
    "status": {
     "const": "trace"
    }
   },
   "additionalProperties": false,
   "required": [
    "status"
   ]
  },
  "status.turned": {
   "type": "object",
   "properties": {
    "status": {
     "enum": [
      "turned"
     ]
    },
    "timelineOf": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*$"
    },
    "at": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*$"
    }
   },
   "additionalProperties": false,
   "required": [
    "status"
   ]
  },
  "targets": {
   "type": "object",
   "properties": {
    "count": {
     "type": "integer",
     "minimum": 0
    },
    "self": {
     "type": "boolean"
    },
    "selfOnly": {
     "type": "boolean"
    },
    "notAlly": {
     "type": "boolean"
    },
    "alliesOnly": {
     "type": "boolean"
    },
    "notLastTarget": {
     "type": "boolean"
    },
    "optional": {
     "type": "boolean"
    },
    "notWith": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*$"
    },
    "upTo": {
     "type": "boolean"
    },
    "dead": {
     "type": "boolean"
    },
    "minDead": {
     "type": "integer",
     "minimum": 0
    }
   },
   "additionalProperties": false
  },
  "team.coven": {
   "type": "object",
   "properties": {
    "module": {
     "const": "coven"
    },
    "id": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*$"
    },
    "alignment": {
     "enum": [
      "good",
      "evil"
     ]
    },
    "leader": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*$"
    },
    "actions": {
     "type": "array",
     "items": {
      "$ref": "#/$defs/verbUse"
     }
    },
    "choice": {
     "$ref": "#/$defs/verbUse"
    },
    "wake": {
     "enum": [
      "everyNight",
      "window"
     ]
    },
    "sidesWith": {
     "type": "array",
     "items": {
      "type": "string",
      "pattern": "^[a-z][a-z0-9_]*$"
     },
     "uniqueItems": true
    },
    "wins": {
     "type": "array",
     "items": {
      "anyOf": [
       {
        "enum": [
         "statusOnLiving",
         "deathsAtLeast",
         "livingAtMost",
         "atLastDawn"
        ]
       },
       {
        "$ref": "#/$defs/win condition.statusOnLiving"
       },
       {
        "$ref": "#/$defs/win condition.deathsAtLeast"
       },
       {
        "$ref": "#/$defs/win condition.livingAtMost"
       },
       {
        "$ref": "#/$defs/win condition.atLastDawn"
       }
      ]
     }
    },
    "tone": {
     "enum": [
      "good",
      "wolf",
      "demon",
      "cult"
     ]
    },
    "colours": {
     "type": "object",
     "properties": {
      "fg": {
       "type": "string",
       "pattern": "^#[0-9a-fA-F]{6}$"
      },
      "bg": {
       "type": "string",
       "pattern": "^#[0-9a-fA-F]{6}$"
      }
     },
     "required": [
      "fg",
      "bg"
     ],
     "additionalProperties": false
    }
   },
   "required": [
    "module",
    "id",
    "alignment"
   ],
   "additionalProperties": false
  },
  "team.cult": {
   "type": "object",
   "properties": {
    "module": {
     "const": "cult"
    },
    "id": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*$"
    },
    "alignment": {
     "enum": [
      "good",
      "evil"
     ]
    },
    "leader": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*$"
    },
    "actions": {
     "type": "array",
     "items": {
      "$ref": "#/$defs/verbUse"
     }
    },
    "choice": {
     "$ref": "#/$defs/verbUse"
    },
    "wake": {
     "enum": [
      "everyNight",
      "window"
     ]
    },
    "sidesWith": {
     "type": "array",
     "items": {
      "type": "string",
      "pattern": "^[a-z][a-z0-9_]*$"
     },
     "uniqueItems": true
    },
    "wins": {
     "type": "array",
     "items": {
      "anyOf": [
       {
        "enum": [
         "statusOnLiving",
         "deathsAtLeast",
         "livingAtMost",
         "atLastDawn"
        ]
       },
       {
        "$ref": "#/$defs/win condition.statusOnLiving"
       },
       {
        "$ref": "#/$defs/win condition.deathsAtLeast"
       },
       {
        "$ref": "#/$defs/win condition.livingAtMost"
       },
       {
        "$ref": "#/$defs/win condition.atLastDawn"
       }
      ]
     }
    },
    "tone": {
     "enum": [
      "good",
      "wolf",
      "demon",
      "cult"
     ]
    },
    "colours": {
     "type": "object",
     "properties": {
      "fg": {
       "type": "string",
       "pattern": "^#[0-9a-fA-F]{6}$"
      },
      "bg": {
       "type": "string",
       "pattern": "^#[0-9a-fA-F]{6}$"
      }
     },
     "required": [
      "fg",
      "bg"
     ],
     "additionalProperties": false
    },
    "win": {
     "enum": [
      "halfOverrides",
      "leaderSurvivesOverrides",
      "leaderSurvivesShares",
      "withAllies"
     ]
    }
   },
   "required": [
    "module",
    "id",
    "alignment"
   ],
   "additionalProperties": false
  },
  "team.evilTeam": {
   "type": "object",
   "properties": {
    "module": {
     "const": "evilTeam"
    },
    "id": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*$"
    },
    "alignment": {
     "enum": [
      "good",
      "evil"
     ]
    },
    "leader": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*$"
    },
    "actions": {
     "type": "array",
     "items": {
      "$ref": "#/$defs/verbUse"
     }
    },
    "choice": {
     "$ref": "#/$defs/verbUse"
    },
    "wake": {
     "enum": [
      "everyNight",
      "window"
     ]
    },
    "sidesWith": {
     "type": "array",
     "items": {
      "type": "string",
      "pattern": "^[a-z][a-z0-9_]*$"
     },
     "uniqueItems": true
    },
    "wins": {
     "type": "array",
     "items": {
      "anyOf": [
       {
        "enum": [
         "statusOnLiving",
         "deathsAtLeast",
         "livingAtMost",
         "atLastDawn"
        ]
       },
       {
        "$ref": "#/$defs/win condition.statusOnLiving"
       },
       {
        "$ref": "#/$defs/win condition.deathsAtLeast"
       },
       {
        "$ref": "#/$defs/win condition.livingAtMost"
       },
       {
        "$ref": "#/$defs/win condition.atLastDawn"
       }
      ]
     }
    },
    "tone": {
     "enum": [
      "good",
      "wolf",
      "demon",
      "cult"
     ]
    },
    "colours": {
     "type": "object",
     "properties": {
      "fg": {
       "type": "string",
       "pattern": "^#[0-9a-fA-F]{6}$"
      },
      "bg": {
       "type": "string",
       "pattern": "^#[0-9a-fA-F]{6}$"
      }
     },
     "required": [
      "fg",
      "bg"
     ],
     "additionalProperties": false
    }
   },
   "required": [
    "module",
    "id",
    "alignment"
   ],
   "additionalProperties": false
  },
  "team.outbreakTeam": {
   "type": "object",
   "properties": {
    "module": {
     "enum": [
      "outbreakTeam"
     ]
    },
    "id": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*$"
    },
    "alignment": {
     "enum": [
      "good",
      "evil"
     ]
    },
    "leader": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*$"
    },
    "actions": {
     "type": "array",
     "items": {
      "$ref": "#/$defs/verbUse"
     }
    },
    "choice": {
     "$ref": "#/$defs/verbUse"
    },
    "wake": {
     "enum": [
      "everyNight",
      "window"
     ]
    },
    "sidesWith": {
     "type": "array",
     "items": {
      "type": "string",
      "pattern": "^[a-z][a-z0-9_]*$"
     },
     "uniqueItems": true
    },
    "wins": {
     "type": "array",
     "items": {
      "anyOf": [
       {
        "enum": [
         "statusOnLiving",
         "deathsAtLeast",
         "livingAtMost",
         "atLastDawn"
        ]
       },
       {
        "$ref": "#/$defs/win condition.statusOnLiving"
       },
       {
        "$ref": "#/$defs/win condition.deathsAtLeast"
       },
       {
        "$ref": "#/$defs/win condition.livingAtMost"
       },
       {
        "$ref": "#/$defs/win condition.atLastDawn"
       }
      ]
     }
    },
    "tone": {
     "enum": [
      "good",
      "wolf",
      "demon",
      "cult"
     ]
    },
    "colours": {
     "type": "object",
     "properties": {
      "fg": {
       "type": "string",
       "pattern": "^#[0-9a-fA-F]{6}$"
      },
      "bg": {
       "type": "string",
       "pattern": "^#[0-9a-fA-F]{6}$"
      }
     },
     "required": [
      "fg",
      "bg"
     ],
     "additionalProperties": false
    },
    "disguisePool": {
     "type": "array",
     "items": {
      "type": "string",
      "pattern": "^[a-z][a-z0-9_]*$"
     },
     "uniqueItems": true
    }
   },
   "required": [
    "module",
    "id",
    "alignment"
   ],
   "additionalProperties": false
  },
  "team.village": {
   "type": "object",
   "properties": {
    "module": {
     "const": "village"
    },
    "id": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*$"
    },
    "alignment": {
     "enum": [
      "good",
      "evil"
     ]
    },
    "leader": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*$"
    },
    "actions": {
     "type": "array",
     "items": {
      "$ref": "#/$defs/verbUse"
     }
    },
    "choice": {
     "$ref": "#/$defs/verbUse"
    },
    "wake": {
     "enum": [
      "everyNight",
      "window"
     ]
    },
    "sidesWith": {
     "type": "array",
     "items": {
      "type": "string",
      "pattern": "^[a-z][a-z0-9_]*$"
     },
     "uniqueItems": true
    },
    "wins": {
     "type": "array",
     "items": {
      "anyOf": [
       {
        "enum": [
         "statusOnLiving",
         "deathsAtLeast",
         "livingAtMost",
         "atLastDawn"
        ]
       },
       {
        "$ref": "#/$defs/win condition.statusOnLiving"
       },
       {
        "$ref": "#/$defs/win condition.deathsAtLeast"
       },
       {
        "$ref": "#/$defs/win condition.livingAtMost"
       },
       {
        "$ref": "#/$defs/win condition.atLastDawn"
       }
      ]
     }
    },
    "tone": {
     "enum": [
      "good",
      "wolf",
      "demon",
      "cult"
     ]
    },
    "colours": {
     "type": "object",
     "properties": {
      "fg": {
       "type": "string",
       "pattern": "^#[0-9a-fA-F]{6}$"
      },
      "bg": {
       "type": "string",
       "pattern": "^#[0-9a-fA-F]{6}$"
      }
     },
     "required": [
      "fg",
      "bg"
     ],
     "additionalProperties": false
    }
   },
   "required": [
    "module",
    "id",
    "alignment"
   ],
   "additionalProperties": false
  },
  "verb.attackGuard": {
   "type": "object",
   "properties": {
    "verb": {
     "const": "attackGuard"
    },
    "id": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*\\.[a-z][a-zA-Z0-9_]*$"
    },
    "uses": {
     "type": "integer",
     "minimum": 1
    },
    "d248": {
     "type": "string",
     "pattern": "^(checked \\(D[0-9]+\\)|owed)$"
    }
   },
   "additionalProperties": false,
   "required": [
    "verb"
   ]
  },
  "verb.block": {
   "type": "object",
   "properties": {
    "verb": {
     "const": "block"
    },
    "id": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*\\.[a-z][a-zA-Z0-9_]*$"
    },
    "step": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*$"
    },
    "when": {
     "$ref": "#/$defs/condition"
    },
    "targets": {
     "$ref": "#/$defs/targets"
    },
    "pool": {
     "enum": [
      "possession"
     ]
    },
    "d248": {
     "type": "string",
     "pattern": "^(checked \\(D[0-9]+\\)|owed)$"
    }
   },
   "additionalProperties": false,
   "required": [
    "verb"
   ]
  },
  "verb.cure": {
   "type": "object",
   "properties": {
    "verb": {
     "const": "cure"
    },
    "id": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*\\.[a-z][a-zA-Z0-9_]*$"
    },
    "step": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*$"
    },
    "when": {
     "$ref": "#/$defs/condition"
    },
    "targets": {
     "$ref": "#/$defs/targets"
    },
    "uses": {
     "type": "integer",
     "minimum": 1
    },
    "d248": {
     "type": "string",
     "pattern": "^(checked \\(D[0-9]+\\)|owed)$"
    },
    "timelineOf": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*$"
    }
   },
   "additionalProperties": false,
   "required": [
    "verb"
   ]
  },
  "verb.dawnFragments": {
   "type": "object",
   "properties": {
    "verb": {
     "const": "dawnFragments"
    },
    "id": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*\\.[a-z][a-zA-Z0-9_]*$"
    },
    "when": {
     "$ref": "#/$defs/condition"
    },
    "d248": {
     "type": "string",
     "pattern": "^(checked \\(D[0-9]+\\)|owed)$"
    }
   },
   "additionalProperties": false,
   "required": [
    "verb"
   ]
  },
  "verb.deathShot": {
   "type": "object",
   "properties": {
    "verb": {
     "const": "deathShot"
    },
    "id": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*\\.[a-z][a-zA-Z0-9_]*$"
    },
    "targets": {
     "$ref": "#/$defs/targets"
    },
    "d248": {
     "type": "string",
     "pattern": "^(checked \\(D[0-9]+\\)|owed)$"
    }
   },
   "additionalProperties": false,
   "required": [
    "verb"
   ]
  },
  "verb.diagnose": {
   "type": "object",
   "properties": {
    "verb": {
     "const": "diagnose"
    },
    "id": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*\\.[a-z][a-zA-Z0-9_]*$"
    },
    "step": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*$"
    },
    "when": {
     "$ref": "#/$defs/condition"
    },
    "targets": {
     "$ref": "#/$defs/targets"
    },
    "uses": {
     "type": "integer",
     "minimum": 1
    },
    "d248": {
     "type": "string",
     "pattern": "^(checked \\(D[0-9]+\\)|owed)$"
    }
   },
   "additionalProperties": false,
   "required": [
    "verb"
   ]
  },
  "verb.driveOut": {
   "type": "object",
   "properties": {
    "verb": {
     "const": "driveOut"
    },
    "id": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*\\.[a-z][a-zA-Z0-9_]*$"
    },
    "step": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*$"
    },
    "when": {
     "$ref": "#/$defs/condition"
    },
    "targets": {
     "$ref": "#/$defs/targets"
    },
    "pool": {
     "enum": [
      "possession"
     ]
    },
    "d248": {
     "type": "string",
     "pattern": "^(checked \\(D[0-9]+\\)|owed)$"
    }
   },
   "additionalProperties": false,
   "required": [
    "verb"
   ]
  },
  "verb.frame": {
   "type": "object",
   "properties": {
    "verb": {
     "const": "frame"
    },
    "id": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*\\.[a-z][a-zA-Z0-9_]*$"
    },
    "step": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*$"
    },
    "when": {
     "$ref": "#/$defs/condition"
    },
    "targets": {
     "$ref": "#/$defs/targets"
    },
    "pool": {
     "enum": [
      "possession"
     ]
    },
    "d248": {
     "type": "string",
     "pattern": "^(checked \\(D[0-9]+\\)|owed)$"
    }
   },
   "additionalProperties": false,
   "required": [
    "verb"
   ]
  },
  "verb.groupSense": {
   "type": "object",
   "properties": {
    "verb": {
     "const": "groupSense"
    },
    "id": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*\\.[a-z][a-zA-Z0-9_]*$"
    },
    "step": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*$"
    },
    "when": {
     "$ref": "#/$defs/condition"
    },
    "targets": {
     "$ref": "#/$defs/targets"
    },
    "pool": {
     "enum": [
      "possession"
     ]
    },
    "d248": {
     "type": "string",
     "pattern": "^(checked \\(D[0-9]+\\)|owed)$"
    }
   },
   "additionalProperties": false,
   "required": [
    "verb"
   ]
  },
  "verb.hex": {
   "type": "object",
   "properties": {
    "verb": {
     "enum": [
      "hex"
     ]
    },
    "id": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*\\.[a-z][a-zA-Z0-9_]*$"
    },
    "step": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*$"
    },
    "when": {
     "$ref": "#/$defs/condition"
    },
    "targets": {
     "$ref": "#/$defs/targets"
    },
    "uses": {
     "type": "integer",
     "minimum": 1
    },
    "d248": {
     "type": "string",
     "pattern": "^(checked \\(D[0-9]+\\)|owed)$"
    },
    "feverAbility": {
     "type": "boolean"
    }
   },
   "additionalProperties": false,
   "required": [
    "verb"
   ]
  },
  "verb.infect": {
   "type": "object",
   "properties": {
    "verb": {
     "enum": [
      "infect"
     ]
    },
    "id": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*\\.[a-z][a-zA-Z0-9_]*$"
    },
    "step": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*$"
    },
    "when": {
     "$ref": "#/$defs/condition"
    },
    "targets": {
     "$ref": "#/$defs/targets"
    },
    "uses": {
     "type": "integer",
     "minimum": 1
    },
    "d248": {
     "type": "string",
     "pattern": "^(checked \\(D[0-9]+\\)|owed)$"
    }
   },
   "additionalProperties": false,
   "required": [
    "verb"
   ]
  },
  "verb.kill": {
   "type": "object",
   "properties": {
    "verb": {
     "const": "kill"
    },
    "id": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*\\.[a-z][a-zA-Z0-9_]*$"
    },
    "step": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*$"
    },
    "when": {
     "$ref": "#/$defs/condition"
    },
    "targets": {
     "$ref": "#/$defs/targets"
    },
    "uses": {
     "type": "integer",
     "minimum": 1
    },
    "d248": {
     "type": "string",
     "pattern": "^(checked \\(D[0-9]+\\)|owed)$"
    }
   },
   "additionalProperties": false,
   "required": [
    "verb"
   ]
  },
  "verb.learnRole": {
   "type": "object",
   "properties": {
    "verb": {
     "const": "learnRole"
    },
    "id": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*\\.[a-z][a-zA-Z0-9_]*$"
    },
    "when": {
     "$ref": "#/$defs/condition"
    },
    "targets": {
     "$ref": "#/$defs/targets"
    },
    "uses": {
     "type": "integer",
     "minimum": 1
    },
    "d248": {
     "type": "string",
     "pattern": "^(checked \\(D[0-9]+\\)|owed)$"
    }
   },
   "additionalProperties": false,
   "required": [
    "verb"
   ]
  },
  "verb.nameLeader": {
   "type": "object",
   "properties": {
    "verb": {
     "const": "nameLeader"
    },
    "id": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*\\.[a-z][a-zA-Z0-9_]*$"
    },
    "d248": {
     "type": "string",
     "pattern": "^(checked \\(D[0-9]+\\)|owed)$"
    }
   },
   "additionalProperties": false,
   "required": [
    "verb"
   ]
  },
  "verb.outbreakKill": {
   "type": "object",
   "properties": {
    "verb": {
     "enum": [
      "outbreakKill"
     ]
    },
    "id": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*\\.[a-z][a-zA-Z0-9_]*$"
    },
    "step": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*$"
    },
    "when": {
     "$ref": "#/$defs/condition"
    },
    "targets": {
     "$ref": "#/$defs/targets"
    },
    "d248": {
     "type": "string",
     "pattern": "^(checked \\(D[0-9]+\\)|owed)$"
    },
    "timelineOf": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*$"
    }
   },
   "additionalProperties": false,
   "required": [
    "verb"
   ]
  },
  "verb.protect": {
   "type": "object",
   "properties": {
    "verb": {
     "const": "protect"
    },
    "id": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*\\.[a-z][a-zA-Z0-9_]*$"
    },
    "step": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*$"
    },
    "when": {
     "$ref": "#/$defs/condition"
    },
    "targets": {
     "$ref": "#/$defs/targets"
    },
    "uses": {
     "type": "integer",
     "minimum": 1
    },
    "pool": {
     "enum": [
      "possession"
     ]
    },
    "d248": {
     "type": "string",
     "pattern": "^(checked \\(D[0-9]+\\)|owed)$"
    }
   },
   "additionalProperties": false,
   "required": [
    "verb"
   ]
  },
  "verb.rankedMark": {
   "type": "object",
   "properties": {
    "verb": {
     "const": "rankedMark"
    },
    "id": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*\\.[a-z][a-zA-Z0-9_]*$"
    },
    "step": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*$"
    },
    "when": {
     "$ref": "#/$defs/condition"
    },
    "d248": {
     "type": "string",
     "pattern": "^(checked \\(D[0-9]+\\)|owed)$"
    }
   },
   "additionalProperties": false,
   "required": [
    "verb"
   ]
  },
  "verb.readDead": {
   "type": "object",
   "properties": {
    "verb": {
     "const": "readDead"
    },
    "id": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*\\.[a-z][a-zA-Z0-9_]*$"
    },
    "when": {
     "$ref": "#/$defs/condition"
    },
    "targets": {
     "$ref": "#/$defs/targets"
    },
    "uses": {
     "type": "integer",
     "minimum": 1
    },
    "d248": {
     "type": "string",
     "pattern": "^(checked \\(D[0-9]+\\)|owed)$"
    }
   },
   "additionalProperties": false,
   "required": [
    "verb"
   ]
  },
  "verb.readDeadPick": {
   "type": "object",
   "properties": {
    "verb": {
     "const": "readDeadPick"
    },
    "id": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*\\.[a-z][a-zA-Z0-9_]*$"
    },
    "when": {
     "$ref": "#/$defs/condition"
    },
    "targets": {
     "$ref": "#/$defs/targets"
    },
    "uses": {
     "type": "integer",
     "minimum": 1
    },
    "d248": {
     "type": "string",
     "pattern": "^(checked \\(D[0-9]+\\)|owed)$"
    }
   },
   "additionalProperties": false,
   "required": [
    "verb"
   ]
  },
  "verb.recruit": {
   "type": "object",
   "properties": {
    "verb": {
     "const": "recruit"
    },
    "id": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*\\.[a-z][a-zA-Z0-9_]*$"
    },
    "step": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*$"
    },
    "when": {
     "$ref": "#/$defs/condition"
    },
    "targets": {
     "$ref": "#/$defs/targets"
    },
    "d248": {
     "type": "string",
     "pattern": "^(checked \\(D[0-9]+\\)|owed)$"
    },
    "cap": {
     "anyOf": [
      {
       "type": "integer",
       "minimum": 0
      },
      {
       "type": "array",
       "items": {
        "type": "array",
        "prefixItems": [
         {
          "type": "integer",
          "minimum": 0
         },
         {
          "type": "integer",
          "minimum": 0
         }
        ],
        "minItems": 2,
        "maxItems": 2
       }
      }
     ]
    },
    "from": {
     "type": "integer",
     "minimum": 1
    },
    "blockedSpendsRecruit": {
     "type": "boolean"
    },
    "onDeath": {
     "enum": [
      "keep",
      "dissolve"
     ]
    }
   },
   "additionalProperties": false,
   "required": [
    "verb"
   ]
  },
  "verb.revealVoteWeight": {
   "type": "object",
   "properties": {
    "verb": {
     "const": "revealVoteWeight"
    },
    "id": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*\\.[a-z][a-zA-Z0-9_]*$"
    },
    "targets": {
     "$ref": "#/$defs/targets"
    },
    "uses": {
     "type": "integer",
     "minimum": 1
    },
    "d248": {
     "type": "string",
     "pattern": "^(checked \\(D[0-9]+\\)|owed)$"
    }
   },
   "additionalProperties": false,
   "required": [
    "verb"
   ]
  },
  "verb.rite": {
   "type": "object",
   "properties": {
    "verb": {
     "const": "rite"
    },
    "id": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*\\.[a-z][a-zA-Z0-9_]*$"
    },
    "step": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*$"
    },
    "when": {
     "$ref": "#/$defs/condition"
    },
    "targets": {
     "$ref": "#/$defs/targets"
    },
    "pool": {
     "enum": [
      "possession"
     ]
    },
    "d248": {
     "type": "string",
     "pattern": "^(checked \\(D[0-9]+\\)|owed)$"
    }
   },
   "additionalProperties": false,
   "required": [
    "verb"
   ]
  },
  "verb.senseAlignment": {
   "type": "object",
   "properties": {
    "verb": {
     "const": "senseAlignment"
    },
    "id": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*\\.[a-z][a-zA-Z0-9_]*$"
    },
    "when": {
     "$ref": "#/$defs/condition"
    },
    "targets": {
     "$ref": "#/$defs/targets"
    },
    "uses": {
     "type": "integer",
     "minimum": 1
    },
    "d248": {
     "type": "string",
     "pattern": "^(checked \\(D[0-9]+\\)|owed)$"
    }
   },
   "additionalProperties": false,
   "required": [
    "verb"
   ]
  },
  "verb.senseCult": {
   "type": "object",
   "properties": {
    "verb": {
     "const": "senseCult"
    },
    "id": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*\\.[a-z][a-zA-Z0-9_]*$"
    },
    "step": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*$"
    },
    "when": {
     "$ref": "#/$defs/condition"
    },
    "targets": {
     "$ref": "#/$defs/targets"
    },
    "pool": {
     "enum": [
      "possession"
     ]
    },
    "d248": {
     "type": "string",
     "pattern": "^(checked \\(D[0-9]+\\)|owed)$"
    }
   },
   "additionalProperties": false,
   "required": [
    "verb"
   ]
  },
  "verb.senseSpirit": {
   "type": "object",
   "properties": {
    "verb": {
     "const": "senseSpirit"
    },
    "id": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*\\.[a-z][a-zA-Z0-9_]*$"
    },
    "step": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*$"
    },
    "when": {
     "$ref": "#/$defs/condition"
    },
    "targets": {
     "$ref": "#/$defs/targets"
    },
    "pool": {
     "enum": [
      "possession"
     ]
    },
    "d248": {
     "type": "string",
     "pattern": "^(checked \\(D[0-9]+\\)|owed)$"
    }
   },
   "additionalProperties": false,
   "required": [
    "verb"
   ]
  },
  "verb.shield": {
   "type": "object",
   "properties": {
    "verb": {
     "const": "shield"
    },
    "id": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*\\.[a-z][a-zA-Z0-9_]*$"
    },
    "step": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*$"
    },
    "when": {
     "$ref": "#/$defs/condition"
    },
    "targets": {
     "$ref": "#/$defs/targets"
    },
    "pool": {
     "enum": [
      "possession"
     ]
    },
    "d248": {
     "type": "string",
     "pattern": "^(checked \\(D[0-9]+\\)|owed)$"
    }
   },
   "additionalProperties": false,
   "required": [
    "verb"
   ]
  },
  "verb.steer": {
   "type": "object",
   "properties": {
    "verb": {
     "const": "steer"
    },
    "id": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*\\.[a-z][a-zA-Z0-9_]*$"
    },
    "step": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*$"
    },
    "when": {
     "$ref": "#/$defs/condition"
    },
    "targets": {
     "$ref": "#/$defs/targets"
    },
    "pool": {
     "enum": [
      "possession"
     ]
    },
    "d248": {
     "type": "string",
     "pattern": "^(checked \\(D[0-9]+\\)|owed)$"
    }
   },
   "additionalProperties": false,
   "required": [
    "verb"
   ]
  },
  "verb.successor": {
   "type": "object",
   "properties": {
    "verb": {
     "const": "successor"
    },
    "id": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*\\.[a-z][a-zA-Z0-9_]*$"
    },
    "d248": {
     "type": "string",
     "pattern": "^(checked \\(D[0-9]+\\)|owed)$"
    },
    "minAlive": {
     "type": "integer",
     "minimum": 0
    }
   },
   "additionalProperties": false,
   "required": [
    "verb"
   ]
  },
  "verb.swapCards": {
   "type": "object",
   "properties": {
    "verb": {
     "const": "swapCards"
    },
    "id": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*\\.[a-z][a-zA-Z0-9_]*$"
    },
    "step": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*$"
    },
    "when": {
     "$ref": "#/$defs/condition"
    },
    "targets": {
     "$ref": "#/$defs/targets"
    },
    "uses": {
     "type": "integer",
     "minimum": 1
    },
    "d248": {
     "type": "string",
     "pattern": "^(checked \\(D[0-9]+\\)|owed)$"
    }
   },
   "additionalProperties": false,
   "required": [
    "verb"
   ]
  },
  "verb.swapVerbs": {
   "type": "object",
   "properties": {
    "verb": {
     "const": "swapVerbs"
    },
    "id": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*\\.[a-z][a-zA-Z0-9_]*$"
    },
    "step": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*$"
    },
    "when": {
     "$ref": "#/$defs/condition"
    },
    "targets": {
     "$ref": "#/$defs/targets"
    },
    "pool": {
     "enum": [
      "possession"
     ]
    },
    "d248": {
     "type": "string",
     "pattern": "^(checked \\(D[0-9]+\\)|owed)$"
    }
   },
   "additionalProperties": false,
   "required": [
    "verb"
   ]
  },
  "verb.teamKill": {
   "type": "object",
   "properties": {
    "verb": {
     "const": "teamKill"
    },
    "id": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*\\.[a-z][a-zA-Z0-9_]*$"
    },
    "step": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*$"
    },
    "when": {
     "$ref": "#/$defs/condition"
    },
    "targets": {
     "$ref": "#/$defs/targets"
    },
    "d248": {
     "type": "string",
     "pattern": "^(checked \\(D[0-9]+\\)|owed)$"
    }
   },
   "additionalProperties": false,
   "required": [
    "verb"
   ]
  },
  "verb.villageVote": {
   "type": "object",
   "properties": {
    "verb": {
     "const": "villageVote"
    },
    "id": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*\\.[a-z][a-zA-Z0-9_]*$"
    },
    "step": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*$"
    },
    "when": {
     "$ref": "#/$defs/condition"
    },
    "targets": {
     "$ref": "#/$defs/targets"
    },
    "d248": {
     "type": "string",
     "pattern": "^(checked \\(D[0-9]+\\)|owed)$"
    }
   },
   "additionalProperties": false,
   "required": [
    "verb"
   ]
  },
  "verb.ward": {
   "type": "object",
   "properties": {
    "verb": {
     "const": "ward"
    },
    "id": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*\\.[a-z][a-zA-Z0-9_]*$"
    },
    "step": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*$"
    },
    "when": {
     "$ref": "#/$defs/condition"
    },
    "targets": {
     "$ref": "#/$defs/targets"
    },
    "pool": {
     "enum": [
      "possession"
     ]
    },
    "d248": {
     "type": "string",
     "pattern": "^(checked \\(D[0-9]+\\)|owed)$"
    }
   },
   "additionalProperties": false,
   "required": [
    "verb"
   ]
  },
  "verb.watch": {
   "type": "object",
   "properties": {
    "verb": {
     "const": "watch"
    },
    "id": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*\\.[a-z][a-zA-Z0-9_]*$"
    },
    "step": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*$"
    },
    "when": {
     "$ref": "#/$defs/condition"
    },
    "targets": {
     "$ref": "#/$defs/targets"
    },
    "pool": {
     "enum": [
      "possession"
     ]
    },
    "d248": {
     "type": "string",
     "pattern": "^(checked \\(D[0-9]+\\)|owed)$"
    },
    "pickers": {
     "enum": [
      "dead"
     ]
    }
   },
   "additionalProperties": false,
   "required": [
    "verb"
   ]
  },
  "verbUse": {
   "anyOf": [
    {
     "enum": [
      "senseAlignment",
      "readDead",
      "readDeadPick",
      "protect",
      "swapCards",
      "dawnFragments",
      "deathShot",
      "attackGuard",
      "revealVoteWeight",
      "kill",
      "teamKill",
      "hex",
      "recruit",
      "learnRole",
      "successor",
      "nameLeader",
      "infect",
      "cure",
      "diagnose",
      "villageVote",
      "rankedMark",
      "outbreakKill",
      "rite",
      "groupSense",
      "ward",
      "senseCult",
      "driveOut",
      "senseSpirit",
      "watch",
      "swapVerbs",
      "steer",
      "shield",
      "frame",
      "block"
     ]
    },
    {
     "$ref": "#/$defs/verb.senseAlignment"
    },
    {
     "$ref": "#/$defs/verb.readDead"
    },
    {
     "$ref": "#/$defs/verb.readDeadPick"
    },
    {
     "$ref": "#/$defs/verb.protect"
    },
    {
     "$ref": "#/$defs/verb.swapCards"
    },
    {
     "$ref": "#/$defs/verb.dawnFragments"
    },
    {
     "$ref": "#/$defs/verb.deathShot"
    },
    {
     "$ref": "#/$defs/verb.attackGuard"
    },
    {
     "$ref": "#/$defs/verb.revealVoteWeight"
    },
    {
     "$ref": "#/$defs/verb.kill"
    },
    {
     "$ref": "#/$defs/verb.teamKill"
    },
    {
     "$ref": "#/$defs/verb.hex"
    },
    {
     "$ref": "#/$defs/verb.recruit"
    },
    {
     "$ref": "#/$defs/verb.learnRole"
    },
    {
     "$ref": "#/$defs/verb.successor"
    },
    {
     "$ref": "#/$defs/verb.nameLeader"
    },
    {
     "$ref": "#/$defs/verb.infect"
    },
    {
     "$ref": "#/$defs/verb.cure"
    },
    {
     "$ref": "#/$defs/verb.diagnose"
    },
    {
     "$ref": "#/$defs/verb.villageVote"
    },
    {
     "$ref": "#/$defs/verb.rankedMark"
    },
    {
     "$ref": "#/$defs/verb.outbreakKill"
    },
    {
     "$ref": "#/$defs/verb.rite"
    },
    {
     "$ref": "#/$defs/verb.groupSense"
    },
    {
     "$ref": "#/$defs/verb.ward"
    },
    {
     "$ref": "#/$defs/verb.senseCult"
    },
    {
     "$ref": "#/$defs/verb.driveOut"
    },
    {
     "$ref": "#/$defs/verb.senseSpirit"
    },
    {
     "$ref": "#/$defs/verb.watch"
    },
    {
     "$ref": "#/$defs/verb.swapVerbs"
    },
    {
     "$ref": "#/$defs/verb.steer"
    },
    {
     "$ref": "#/$defs/verb.shield"
    },
    {
     "$ref": "#/$defs/verb.frame"
    },
    {
     "$ref": "#/$defs/verb.block"
    }
   ]
  },
  "win condition.atLastDawn": {
   "type": "object",
   "properties": {
    "win": {
     "const": "atLastDawn"
    }
   },
   "additionalProperties": false,
   "required": [
    "win"
   ]
  },
  "win condition.deathsAtLeast": {
   "type": "object",
   "properties": {
    "win": {
     "const": "deathsAtLeast"
    },
    "count": {
     "anyOf": [
      {
       "type": "integer",
       "minimum": 0
      },
      {
       "type": "array",
       "items": {
        "type": "array",
        "prefixItems": [
         {
          "type": "integer",
          "minimum": 1
         },
         {
          "type": "integer",
          "minimum": 0
         }
        ],
        "minItems": 2,
        "maxItems": 2
       }
      }
     ]
    }
   },
   "additionalProperties": false,
   "required": [
    "win"
   ]
  },
  "win condition.livingAtMost": {
   "type": "object",
   "properties": {
    "win": {
     "const": "livingAtMost"
    },
    "count": {
     "anyOf": [
      {
       "type": "integer",
       "minimum": 0
      },
      {
       "type": "array",
       "items": {
        "type": "array",
        "prefixItems": [
         {
          "type": "integer",
          "minimum": 1
         },
         {
          "type": "integer",
          "minimum": 0
         }
        ],
        "minItems": 2,
        "maxItems": 2
       }
      }
     ]
    }
   },
   "additionalProperties": false,
   "required": [
    "win"
   ]
  },
  "win condition.statusOnLiving": {
   "type": "object",
   "properties": {
    "win": {
     "const": "statusOnLiving"
    },
    "status": {
     "type": "string",
     "pattern": "^[a-z][a-z0-9_]*$"
    }
   },
   "additionalProperties": false,
   "required": [
    "win"
   ]
  }
 }
};
