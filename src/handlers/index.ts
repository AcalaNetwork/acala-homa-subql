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

export async function handleRequestedRedeem(event: SubstrateEvent) {
  const blockNumber = event.block.block.header.number.toBigInt();

  /// Request redeem. \[redeemer, liquid_amount, allow_fast_match\]
  const [redeemer] = event.event.data;

  const account = await getAccount(redeemer.toString());
  const record = await getHomaHistory(`${blockNumber}-${event.idx.toString()}`);

  record.addressId = account.id;
  record.type = 'RequestRedeem';
  record.atBlock = blockNumber;
  record.atBlockHash = event.block.block.hash.toString();
  record.atExtrinsicHash = event.extrinsic.extrinsic.hash.toString();
  record.timestamp = event.block.timestamp;

  record.data = mapUpdateKVData(getKVData(event.event.data), [
    { key: 'redeemer'},
    { key: 'liquidAmount'},
    { key: 'allowFastMatch' }
  ]);
}

export async function handleRequestedCancelled(event: SubstrateEvent) {
  const blockNumber = event.block.block.header.number.toBigInt();

  /// Redeem request has been cancelled. \[redeemer, cancelled_liquid_amount\]
  const [redeemer] = event.event.data;

  const account = await getAccount(redeemer.toString());
  const record = await getHomaHistory(`${blockNumber}-${event.idx.toString()}`);

  record.addressId = account.id;
  record.type = 'RequestedCancelled';
  record.atBlock = blockNumber;
  record.atBlockHash = event.block.block.hash.toString();
  record.atExtrinsicHash = event.extrinsic.extrinsic.hash.toString();
  record.timestamp = event.block.timestamp;

  record.data = mapUpdateKVData(getKVData(event.event.data), [
    { key: 'redeemer'},
    { key: 'cancelledLiquidAmount'},
  ]);
}

export async function handleRedeemedByFastMatch(event: SubstrateEvent) {
  const blockNumber = event.block.block.header.number.toBigInt();

/// Redeem request is redeemed partially or fully by fast match. \[redeemer,
/// matched_liquid_amount, fee_in_liquid, redeemed_staking_amount\]
  const [redeemer] = event.event.data;

  const account = await getAccount(redeemer.toString());
  const record = await getHomaHistory(`${blockNumber}-${event.idx.toString()}`);

  record.addressId = account.id;
  record.type = 'RedeemedByFastMatch';
  record.atBlock = blockNumber;
  record.atBlockHash = event.block.block.hash.toString();
  record.atExtrinsicHash = event.extrinsic.extrinsic.hash.toString();
  record.timestamp = event.block.timestamp;

  record.data = mapUpdateKVData(getKVData(event.event.data), [
    { key: 'redeemer'},
    { key: 'matchedLiquidAmount'},
    { key: 'feeInLiquid'},
    { key: 'redeemedStakingAmount'},
  ]);
}

export async function handleRedeemedByUnbond(event: SubstrateEvent) {
  const blockNumber = event.block.block.header.number.toBigInt();

  /// Redeem request is redeemed by unbond on relaychain. \[redeemer,
  /// era_index_when_unbond, liquid_amount, unbonding_staking_amount\]
  const [redeemer] = event.event.data;

  const account = await getAccount(redeemer.toString());
  const record = await getHomaHistory(`${blockNumber}-${event.idx.toString()}`);

  record.addressId = account.id;
  record.type = 'RedeemedByUnbond';
  record.atBlock = blockNumber;
  record.atBlockHash = event.block.block.hash.toString();
  record.atExtrinsicHash = event.extrinsic.extrinsic.hash.toString();
  record.timestamp = event.block.timestamp;

  record.data = mapUpdateKVData(getKVData(event.event.data), [
    { key: 'redeemer'},
    { key: 'eraIndexWhenUnbond'},
    { key: 'liquidAmount'},
    { key: 'unbondingStakingAmount'},
  ]);
}

export async function handleWithdrawRedemption(event: SubstrateEvent) {
  const blockNumber = event.block.block.header.number.toBigInt();

  /// The redeemer withdraw expired redemption. \[redeemer, redemption_amount\]
  /// WithdrawRedemption(T::AccountId, Balance),
  const [redeemer] = event.event.data;

  const account = await getAccount(redeemer.toString());
  const record = await getHomaHistory(`${blockNumber}-${event.idx.toString()}`);

  record.addressId = account.id;
  record.type = 'WithdrawRedemption';
  record.atBlock = blockNumber;
  record.atBlockHash = event.block.block.hash.toString();
  record.atExtrinsicHash = event.extrinsic.extrinsic.hash.toString();
  record.timestamp = event.block.timestamp;

  record.data = mapUpdateKVData(getKVData(event.event.data), [
    { key: 'redeemer'},
    { key: 'redemptionAmount'}
  ]);
}