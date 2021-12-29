import { Account, HomaHistory } from "../types"

export const getAccount = async (address: string) => {
  let record = await Account.get(address);

  if (!record) {
    record = new Account(address);
    record.address = address;

    await record.save();
  }

  return record
}

export const getHomaHistory = async (id: string) => {
  let record = await HomaHistory.get(id);

  if(!record) {
    const newRecord = new HomaHistory(id);

    newRecord.type = '';
    newRecord.subType = '';
    newRecord.atBlock = BigInt(0);
    newRecord.atBlockHash = '';
    newRecord.atExtrinsicHash = '';
    newRecord.timestamp = new Date();

    newRecord.data = [];

    return newRecord;
  } else {
    return record;
  }
}
