const texturesA = ['q','k','v'];
const texturesB = ['p','l','m','n','o'];
const texturesC = ['a','b','c','d','f','g','h','i','j','r','s','t','u','w','y'];

export function mapTextureToRarity(textureName){
  if(texturesC.indexOf(textureName) !== -1){
    return 'normal'
  }else if(texturesB.indexOf(textureName) !== -1){
    return 'Rare'
  }else if(texturesA.indexOf(textureName) !== -1){
    return 'Super Rare'
  }
}
export function mapGeneToTextureRarity(gene) {
  const genePieces =
      [gene.slice(0,3),gene.slice(3,6),gene.slice(6,9),gene.slice(9,12),gene.slice(12,15),gene.slice(15,18)];
  let textureRarity = 0;
  for(let i=0; i<5; i++){
    if(Number(genePieces[i]) < 870){
      textureRarity += 1;
    }else if(Number(genePieces[i]) < 970 && Number(genePieces[i] >= 870)){
      textureRarity += 2;
    }else{
      textureRarity += 3;
    }
  }
  if(textureRarity < 8){
    return 1;
  }else if(textureRarity >= 8 && textureRarity < 13) {
    return 2;
  }else {
    return 3;
  }
}

export function horseStatus(gene){
  const params = [gene.slice(0,3),gene.slice(3,6),gene.slice(6,9),gene.slice(9,12),gene.slice(12,15)];
  let strength=0;
  params.forEach(function (elem,index,self) {
    const num = Number(elem);
    const s = Math.ceil(num / 100);
    strength += s;
  });
  return Math.ceil(strength / 12.5);
}

export function returnRarity(gene){
  return mapGeneToTextureRarity(gene.slice(gene.length - 38, gene.length - 20)) + horseStatus(gene.slice(gene.length-15,gene.length));
}

export function returnClassName(rarity){
  if(rarity<=2){
    return 'horse-back'
  }else if(rarity > 2 && rarity <= 4){
    return 'horse-back2'
  }else if(rarity > 4 && rarity <= 6){
    return 'horse-back3'
  }else if(rarity > 6 && rarity <= 8){
    return 'horse-back4'
  }else if(rarity === 9){
    return 'horse-back-silver'
  }else if(rarity === 10){
    return 'horse-back-gold'
  }
}

export function returnRankingHorseBack(rank){
  switch (rank){
    case 1:
      return 'horse-back-gold';
    case 2:
      return 'horse-back-silver';
    case 3:
      return 'horse-back4';
    case 4:
      return 'horse-back3';
    default:
      return 'horse-back1'
  }
}
