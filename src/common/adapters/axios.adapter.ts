import { HttpAdapterInterface } from "../interfaces/http-adapter-interface";
import axios from 'axios';
import { Injectable } from "@nestjs/common";

@Injectable()
export class AxiosAdapter implements HttpAdapterInterface {
  private readonly axios = axios;

  async get<T>(url: string): Promise<T> {
    try {
      const { data } = await this.axios.get<T>(url);
      return data;
    } catch (error) {
      console.log(error);
      throw new Error('Error on AxiosAdapter.get()');
    }
  }
}