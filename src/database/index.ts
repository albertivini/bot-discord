import { QuickDB } from "quick.db";
import { GuildData } from "./interfaces/GuildData.js";
import { MemberData } from "./interfaces/MemberData.js";
import { ProductData } from "./interfaces/ProductData.js";
import { UserProductData } from "./interfaces/UserProductData.js";

const filePath = rootTo("localdb.sqlite");

const db = {
    guilds: new QuickDB<GuildData>({ filePath, table: "guilds" }),
    members: new QuickDB<MemberData>({ filePath, table: "members" }),
    products: new QuickDB<ProductData>({ filePath, table: "products" }),
    userProducts: new QuickDB<UserProductData>({ filePath, table: "user_products" })
};

export { db };