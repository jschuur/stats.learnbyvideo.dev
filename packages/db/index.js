"use strict";
exports.__esModule = true;
exports.prisma = void 0;
var client_1 = require("@prisma/client");
var cachedPrisma;
exports.prisma = cachedPrisma !== null && cachedPrisma !== void 0 ? cachedPrisma : new client_1.PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error']
});
if (process.env.NODE_ENV !== 'production')
    cachedPrisma = exports.prisma;
