export const MIDDLEWARE_RESPONSE_ERROR = {
    DEFAULT: {
        MIN_EN: {
            rating: [{ key: "min-rating", params: { field: "rating", value: -5, min: 0 }, description: "min-rating" }],
        },
        MAX_ES: {
            rating: [{ key: "max", params: { field: "rating", value: 15, max: 10 }, description: "El valor del campo 'rating' debe ser menor o igual de '10'." }],
        },
        MAX_EN: {
            rating: [{ key: "max", params: { field: "rating", value: 15, max: 10 }, description: "The value of the 'rating' field must be less or equal than '10'." }],
        },
    },
    CUSTOM: {
        MAX_ES: {
            rating: [{ key: "max", params: { field: "rating", value: 15, max: 10 }, description: "El valor máximo para el campo 'rating' es '10'." }],
        },
        MIN_AST: {
            rating: [{ key: "min-rating", params: { field: "rating", value: -5, min: 0 }, description: "¡Yes fatu! ¡En Asturies la valoración mínima ye como poco '0', a ver si te enteres soplagaitas!" }],
        },
    },
};
