import { Client, Account, Databases, ID } from 'appwrite';

const client = new Client();
client.setEndpoint('https://cloud.appwrite.io/v1').setProject('687f1bd4000c59f4555b');

const account = new Account(client);
const database = new Databases(client); // ✅ singular name

export { account, database, ID  }; // ✅ export correctly
