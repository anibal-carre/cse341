const swaggerDocument = {
    openapi: "3.0.0",
    info: {
        title: "Contacts API",
        version: "1.0.0",
        description: "API para almacenar contactos (firstName, lastName, email, favoriteColor, birthday)"
    },
    servers: [
        { url: process.env.RENDER_URL || "http://localhost:8080", description: "Production/Render or Local" }
    ],
    paths: {
        "/contacts": {
            get: {
                summary: "Get all contacts",
                responses: {
                    "200": {
                        description: "Array of contacts",
                        content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Contact" } } } }
                    }
                }
            },
            post: {
                summary: "Create a new contact",
                requestBody: {
                    required: true,
                    content: { "application/json": { schema: { $ref: "#/components/schemas/Contact" } } }
                },
                responses: {
                    "201": { description: "Contact created", content: { "application/json": { schema: { type: "object", properties: { insertedId: { type: "string" } } } } } },
                    "400": { description: "Bad request" }
                }
            }
        },
        "/contacts/{id}": {
            get: {
                summary: "Get contact by id",
                parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
                responses: {
                    "200": { description: "Contact", content: { "application/json": { schema: { $ref: "#/components/schemas/ContactWithId" } } } },
                    "404": { description: "Not found" }
                }
            },
            put: {
                summary: "Update an existing contact",
                parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
                requestBody: {
                    required: true,
                    content: { "application/json": { schema: { $ref: "#/components/schemas/Contact" } } }
                },
                responses: {
                    "204": { description: "Updated successfully (No Content)" },
                    "400": { description: "Bad request" },
                    "404": { description: "Not found" }
                }
            },
            delete: {
                summary: "Delete contact",
                parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
                responses: {
                    "204": { description: "Deleted successfully (No Content)" },
                    "404": { description: "Not found" }
                }
            }
        }
    },
    components: {
        schemas: {
            Contact: {
                type: "object",
                required: ["firstName", "lastName", "email", "favoriteColor", "birthday"],
                properties: {
                    firstName: { type: "string" },
                    lastName: { type: "string" },
                    email: { type: "string", format: "email" },
                    favoriteColor: { type: "string" },
                    birthday: { type: "string", format: "date" }
                }
            },
            ContactWithId: {
                allOf: [
                    { $ref: "#/components/schemas/Contact" },
                    { type: "object", properties: { _id: { type: "string" } } }
                ]
            }
        }
    }
};

module.exports = swaggerDocument;
