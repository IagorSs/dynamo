/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
import AWS from 'aws-sdk/clients/dynamodb';

class TokenController {
  static async getClient() {
    return new AWS.DocumentClient();
  }

  static async insertToken(token:string) {
    const input = {
      token,
    };
    const params = {
      TableName: 'tokens',
      Item: input,
    };
    try {
      const docClient = await TokenController.getClient();
      const returningObg = new Promise<Object>((resolve) => {
        docClient.put(params, (err, data) => {
          if (err) {
            console.log(`erro ao inserir o token - ${err}`);
            resolve({ message: 'erro ao inserir o token' });
            return err;
          }
          resolve({ data, message: null });
          return data;
        });
      });
      await returningObg;
      return returningObg;
    } catch (error) {
      return error.message;
    }
  }
}

export default TokenController;
