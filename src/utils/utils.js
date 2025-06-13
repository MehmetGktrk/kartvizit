exports.createID = async(db) => {
  const result = await db.collection('Counters').findOneAndUpdate(
    { counterName: 'IDCounter' },
    { $inc: { sequence_value: 1 } },
    { returnDocument: 'after', upsert: true }
  );

  const doc = result.value ?? result;
  if (!doc) {
    throw new Error('IDCounter oluşturulamadı veya erişilemedi.');
  }

  return doc.sequence_value;
}


exports.totalView = async(users) => {
  let totalUserView = 0;

  for(let user of users){
    let userView = user.views ?? 0; // eğer views kısmı bulunmazsa 0 olarak döndür

    totalUserView += userView
  }

  return totalUserView;
}