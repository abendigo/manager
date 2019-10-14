// import EthCrypto from 'eth-crypto';
import * as ethUtil from 'ethereumjs-util';
// import * as sigUtil from 'eth-sig-util';

export function del(request, response) {
  response.writeHead(200, {
		'Content-Type': 'application/json'
  });

  request.session.user = undefined;

	response.end(JSON.stringify({}));
}

export function post(request, response) {
  console.log({params: request.params, body: request.body, session: request.session});

  // const message = '\x19Ethereum Signed Message:\nthis is my message';
  const message = 'this is my message';
  const signature = request.body.signature;

  // const xxx = EthCrypto.recover(request.body.signature, EthCrypto.hash.keccak256(message));
  // console.log({xxx})
  const msgBuffer = ethUtil.toBuffer(message);
  const msgHash = ethUtil.hashPersonalMessage(msgBuffer);
  const signatureBuffer = ethUtil.toBuffer(signature);
  const signatureParams = ethUtil.fromRpcSig(signatureBuffer);
  const publicKey = ethUtil.ecrecover(
    msgHash,
    signatureParams.v,
    signatureParams.r,
    signatureParams.s
  );
  const addressBuffer = ethUtil.publicToAddress(publicKey);
  const address = ethUtil.bufferToHex(addressBuffer);

  console.log({ address });

  request.session.user = 'foo';

  response.writeHead(200, {
		'Content-Type': 'application/json'
  });

	response.end(JSON.stringify({user: 'foo'}));
}
