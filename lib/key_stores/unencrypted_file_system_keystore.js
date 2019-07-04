'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const util_1 = require("util");
const key_pair_1 = require("../utils/key_pair");
const keystore_1 = require("./keystore");
const promisify = (fn) => {
    if (!fn) {
        return () => {
            throw new Error('Trying to use unimplemented function. `fs` module not available in web build?');
        };
    }
    return util_1.promisify(fn);
};
const exists = promisify(fs_1.default.exists);
const readFile = promisify(fs_1.default.readFile);
const writeFile = promisify(fs_1.default.writeFile);
const unlink = promisify(fs_1.default.unlink);
const readdir = promisify(fs_1.default.readdir);
const mkdir = promisify(fs_1.default.mkdir);
const rmdir = promisify(fs_1.default.rmdir);
async function loadJsonFile(path) {
    const content = await readFile(path);
    return JSON.parse(content.toString());
}
exports.loadJsonFile = loadJsonFile;
async function ensureDir(path) {
    try {
        await mkdir(path, { recursive: true });
    }
    catch (err) {
        if (err.code !== 'EEXIST') {
            throw err;
        }
    }
}
class UnencryptedFileSystemKeyStore extends keystore_1.KeyStore {
    constructor(keyDir) {
        super();
        this.keyDir = keyDir;
    }
    async setKey(networkId, accountId, keyPair) {
        await ensureDir(`${this.keyDir}/${networkId}`);
        const content = { account_id: accountId, private_key: keyPair.toString() };
        await writeFile(this.getKeyFilePath(networkId, accountId), JSON.stringify(content));
    }
    async getKey(networkId, accountId) {
        // Find key / account id.
        if (!await exists(this.getKeyFilePath(networkId, accountId))) {
            return null;
        }
        const accountInfo = await loadJsonFile(this.getKeyFilePath(networkId, accountId));
        return key_pair_1.KeyPair.fromString(accountInfo.private_key);
    }
    async removeKey(networkId, accountId) {
        if (await exists(this.getKeyFilePath(networkId, accountId))) {
            await unlink(this.getKeyFilePath(networkId, accountId));
        }
    }
    async clear() {
        await rmdir(this.keyDir);
    }
    getKeyFilePath(networkId, accountId) {
        return `${this.keyDir}/${networkId}/${accountId}.json`;
    }
    async getNetworks() {
        const files = await readdir(this.keyDir);
        const result = new Array();
        files.forEach((item) => {
            result.push(item);
        });
        return result;
    }
    async getAccounts(networkId) {
        if (!await exists(`${this.keyDir}/${networkId}`)) {
            return [];
        }
        const files = await readdir(`${this.keyDir}/${networkId}`);
        return files
            .filter(file => file.endsWith('.json'))
            .map(file => file.replace(/.json$/, ''));
    }
    async totalAccounts() {
        let result = 0;
        const networkDirs = await readdir(this.keyDir);
        for (const networkId of networkDirs) {
            result += (await this.getAccounts(networkId)).length;
        }
        return result;
    }
}
exports.UnencryptedFileSystemKeyStore = UnencryptedFileSystemKeyStore;