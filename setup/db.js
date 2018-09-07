db.createCollection("Users", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["username", "password", "salt"],
            properties: {
                username: {
                    bsonType: "string",
                },
                password: {
                    bsonType: "string"
                },
                salt: {
                    bsonType: "string"
                }
            }
        }
    }
})

db.createCollection("Profiles", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["username"],
            properties: {
                username: {
                    bsonType: "string"
                },
                image: {
                    bsonType: "string"
                },
                events: {
                    bsonType: "array"
                },
                attended: {
                    bsonType: "array"
                }
            }
        }
    }
})

db.createCollection("Events", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["creator", "status", "name", "description", "tags", "location"],
            properties: {
                creator: {
                    bsonType: "string",
                },
                status: {
                    enum: ['active', 'expired']
                },
                name: {
                    bsonType: "string"
                },
                description: {
                    bsonType: "string"
                },
                tags: {
                    bsonType: "array"
                },
                location: {
                    bsonType: "object"
                },
                attendees: {
                    bsonType: "array"
                },
                max: {
                    bsonType: "int"
                },
                duration: {
                    bsonType: "int"
                }
            }
        }
    }
})