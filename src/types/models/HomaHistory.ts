// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';

import {
    KVData,
} from '../interfaces'




export class HomaHistory implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public addressId?: string;

    public type?: string;

    public subType?: string;

    public atBlock?: bigint;

    public atBlockHash?: string;

    public atExtrinsicHash?: string;

    public timestamp?: Date;

    public data?: KVData[];


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save HomaHistory entity without an ID");
        await store.set('HomaHistory', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove HomaHistory entity without an ID");
        await store.remove('HomaHistory', id.toString());
    }

    static async get(id:string): Promise<HomaHistory | undefined>{
        assert((id !== null && id !== undefined), "Cannot get HomaHistory entity without an ID");
        const record = await store.get('HomaHistory', id.toString());
        if (record){
            return HomaHistory.create(record);
        }else{
            return;
        }
    }


    static async getByAddressId(addressId: string): Promise<HomaHistory[] | undefined>{
      
      const records = await store.getByField('HomaHistory', 'addressId', addressId);
      return records.map(record => HomaHistory.create(record));
      
    }


    static create(record: Partial<Omit<HomaHistory, FunctionPropertyNames<HomaHistory>>> & Entity): HomaHistory {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new HomaHistory(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
