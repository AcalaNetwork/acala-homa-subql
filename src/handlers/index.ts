import { SubstrateEvent } from "@subql/types/dist/interfaces";
import { getAccount, getHomaHistory, getKVData, mapUpdateKVData } from "../utils";

export async function handleMint (event: SubstrateEvent) {
  const blockNumber = event.block.block.header.number.toBigInt();

  /// The minter use staking currency to mint liquid currency. \[minter,
  /// staking_currency_amount, liquid_amount_received, liquid_amount_added_to_void\]
  const [minter] = event.event.data;

  const account = await getAccount(minter.toString());
  const record = await getHomaHistory(`${blockNumber}-${event.idx.toString()}`);

  record.addressId = account.id;
  record.type = 'Mint';
  record.atBlock = blockNumber;
  record.atBlockHash = event.block.block.hash.toString();
  record.atExtrinsicHash = event.extrinsic.extrinsic.hash.toString();
  record.timestamp = event.block.timestamp;

  record.data = mapUpdateKVData(getKVData(event.event.data), [
    { key: 'minter'},
    { key: 'stakingCurrencyAmount'},
    { key: 'liquidAmountReceived' },
    { key: 'liquidAmountAddToVoid'}
  ]);
}