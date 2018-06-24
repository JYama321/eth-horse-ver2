const textureRateMapping = {
  normal_rates: ["a","b","c","d","e","f","g","h","i","j"],
  slightly_rare: ["k","l","m","n","o","p","q","s","t","u"],
  rare: ["r",""]
};

export const mapEnToTextureNames =  {
  en:{
    a: 'Stormy Night',
    b: 'King of Tactics',
    c: 'Altocumulus Clouds',
    d: 'Rain Cloud α',
    e: 'Rain Cloud β',
    f: 'Midnight Blue',
    g: 'Fake Leopard',
    h: 'Crimson Red',
    i: 'Custard Yellow',
    j: 'Fresh Green Grass',
    k: 'Sunrise Glow',
    l: 'July Sky',
    m: 'The Last Piece',
    n: 'Thief of Conquest',
    o: 'Apollo',
    p: 'Artemis',
    q: 'Speed Star',
    r: 'Zealous Hero',
    s: 'The Glorious Arrow',
    t: 'Night Magic',
    u: 'Garden Tea Party',
    v: 'Hyper America',
    w: 'Amazon Hunter',
    y: 'Carefree sky',
  },
  ja:{
    a: '嵐の夜',
    b: '知略の王',
    c: 'ひつじ雲',
    d: '雨雲α',
    e: '雨雲β',
    f: 'ミッドナイトブルー',
    g: '豹頭馬肉',
    h: 'クリムゾンレッド',
    i: 'カスタードイエロー',
    j: '若草グリーン',
    k: '朝焼け',
    l: '7月の空',
    m: 'ラストピース',
    n: '勝利の盗人',
    o: '頂上の太陽',
    p: '頂上の月',
    q: 'スピードスター',
    r: '熱血ヒーロー',
    s: '栄光の矢',
    t: '妖刀',
    u: '花畑でティータイム',
    v: 'ハイパー・アメリカ',
    w: 'アマゾン・ハンター',
    x: 'アリスのお茶会',
    y: '屈託のない空'
  }
};

const mapFaceAndHairs = {
  face: ['_1_1','_2_1','_3_1','_4_1','_5_1','_6_1','_7_1','_8_1'],
  hair: ['_1,7_2','_2_2','_3_2','_4_2','_5_2','_6,8_2','_1,7_2','_6,8_2']
};



export function mapGeneToTexture(gene) {
  const genePieces =
      [gene.slice(0,3),gene.slice(3,6),gene.slice(6,9),gene.slice(9,12),gene.slice(12,15),gene.slice(15,18)];
  let textureInfo = [];
  for(let i=0; i<5; i++){
    let index;
    if(Number(genePieces[i]) < 800){
      index = Math.floor(Number(genePieces[i] / 80));
      textureInfo.push(textureRateMapping.normal_rates[index])
    }else if(Number(genePieces[i]) < 980 && Number(genePieces[i] >= 800)){
      index = Math.floor((Number(genePieces[i] - 800) / 18));
      textureInfo.push(textureRateMapping.slightly_rare[index])
    }else{
      index = Math.floor((Number(genePieces[i]) - 980) / 10);
      textureInfo.push(textureRateMapping.rare[0])
    }
  }
  textureInfo.push(Math.floor(genePieces[5] / 125) + 1);
  textureInfo[0] = textureInfo[0] + mapFaceAndHairs["face"][textureInfo[5] - 1];
  textureInfo[1] = textureInfo[1] + mapFaceAndHairs["hair"][textureInfo[5] - 1];
  return textureInfo
}

export function mapGeneToTextureName(gene){
  let textureNames = [];
  const textureInfo = mapGeneToTexture(gene);
  for(let i=0; i<5; i++){
    textureNames.push(mapEnToTextureNames["en"][textureInfo[i].slice(0,1)]);
  }
  return textureNames;
}
