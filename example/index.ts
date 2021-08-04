import { ApiClient } from '../src';

const bootstrap = async () => {
  const api = new ApiClient();
  let time = Date.now();
  const mfcList = await api.mfcList(76);
  // console.log('🚀 ~ file: inedx.ts ~ bootstrap ~ mfcList', mfcList);
  console.log(`Time: ${Date.now() - time} ms`);

  time = Date.now();
  const mfc = await api.mfc(mfcList.data[0].id);
  // console.log('🚀 ~ file: inedx.ts ~ bootstrap ~ mfc', mfc);
  console.log(`Time: ${Date.now() - time} ms`);

  time = Date.now();
  const mfcList2 = await api.mfcList(76);
  // console.log('🚀 ~ file: inedx.ts ~ bootstrap ~ mfcList2', mfcList2);
  console.log(`Time: ${Date.now() - time} ms`);

  await new Promise<void>((resolve) => setTimeout(() => resolve(), 1200));

  time = Date.now();
  const mfcList3 = await api.mfcList(76);
  // console.log('🚀 ~ file: inedx.ts ~ bootstrap ~ mfcList3', mfcList2);
  console.log(`Time: ${Date.now() - time} ms`);

  console.log(
    'Equal:',
    (mfcList.data.length + mfcList2.data.length + mfcList3.data.length) / 3 === mfcList.data.length,
  );
  
};
bootstrap().then();
