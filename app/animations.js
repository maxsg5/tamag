export function sitAnimationRock(image,animationFrame) {

    switch (animationFrame) {
      case 1:
        image.x = 95;
        image.y = 100;
        image.width = 150;
        image.height = 150;
        image.href = "../resources/rockImages/idle/sprite_00.png";
        
        animationFrame = 2;
        break;
      case 2:
        image.href = "../resources/rockImages/idle/sprite_01.png";
        animationFrame = 3;
        break;
      case 3:
        image.href = "../resources/rockImages/idle/sprite_02.png";
  
        animationFrame = 4;
        break;
      case 4:
        image.href = "../resources/rockImages/idle/sprite_03.png";
  
        animationFrame = 5;
        break;
      case 5:
        image.href = "../resources/rockImages/idle/sprite_04.png";
  
        animationFrame = 6;
        break;
      case 6:
        image.href = "../resources/rockImages/idle/sprite_05.png";
  
        animationFrame = 7;
        break;
      case 7:
        image.href = "../resources/rockImages/idle/sprite_06.png";
  
        animationFrame = 8;
        break;
      case 8:
        image.href = "../resources/rockImages/idle/sprite_07.png";
  
        animationFrame = 9;
        break;
      case 9:
        image.href = "../resources/rockImages/idle/sprite_08.png";
  
        animationFrame = 10;
        break;
      case 10:
        image.href = "../resources/rockImages/idle/sprite_09.png";
  
        animationFrame = 11;
        break;
      case 11:
        image.href = "../resources/rockImages/idle/sprite_10.png";
  
        animationFrame = 12;
        break;
      case 12:
        image.href = "../resources/rockImages/idle/sprite_11.png";
  
        animationFrame = 13;
        break;
      case 13:
        image.href = "../resources/rockImages/idle/sprite_12.png";
  
        animationFrame = 14;
        break;
      case 14:
        image.href = "../resources/rockImages/idle/sprite_13.png";
  
        animationFrame = 1;
        break;
    }
    return animationFrame;
  }
export function sitAnimationShroom(image,animationFrame) {
    switch (animationFrame) {
      case 1:
        image.x = -80;
        
        image.y = -40;
        image.width = 500;
        image.height = 500;
        image.href = "../resources/mushroomImages/idle/sprite_00.png";
        
        animationFrame = 2;
        break;
      case 2:
        image.href = "../resources/mushroomImages/idle/sprite_01.png";
        animationFrame = 3;
        break;
      case 3:
        image.href = "../resources/mushroomImages/idle/sprite_02.png";
  
        animationFrame = 4;
        break;
      case 4:
        image.href = "../resources/mushroomImages/idle/sprite_03.png";
  
        animationFrame = 5;
        break;
      case 5:
        image.href = "../resources/mushroomImages/idle/sprite_04.png";
  
        animationFrame = 6;
        break;
      case 6:
        image.href = "../resources/mushroomImages/idle/sprite_05.png";
  
        animationFrame = 7;
        break;
      case 7:
        image.href = "../resources/mushroomImages/idle/sprite_06.png";
  
        animationFrame = 8;
        break;
      case 8:
        image.href = "../resources/mushroomImages/idle/sprite_07.png";
  
        animationFrame = 9;
        break;
      case 9:
        image.href = "../resources/mushroomImages/idle/sprite_08.png";
  
        animationFrame = 10;
        break;
      case 10:
        image.href = "../resources/mushroomImages/idle/sprite_09.png";
  
        animationFrame = 11;
        break;
      case 11:
        image.href = "../resources/mushroomImages/idle/sprite_10.png";
  
        animationFrame = 12;
        break;
      case 12:
        image.href = "../resources/mushroomImages/idle/sprite_11.png";
  
        animationFrame = 13;
        break;
      case 13:
        image.href = "../resources/mushroomImages/idle/sprite_12.png";
  
        animationFrame = 14;
        break;
      case 14:
        image.href = "../resources/mushroomImages/idle/sprite_13.png";
  
        animationFrame = 1;
        break;
    }
    return animationFrame;
  }
export function sitAnimationDino(image,animationFrame) {
    switch (animationFrame) {
      case 1:
        image.x = 75;
        image.y = 100;
        image.width = 200;
        image.height = 200;
        image.href = "../resources/petImages/tile000.png";
        
        animationFrame = 2;
        break;
      case 2:
        image.href = "../resources/petImages/tile001.png";
        animationFrame = 3;
        break;
      case 3:
        image.href = "../resources/petImages/tile002.png";
        animationFrame = 1;
        break;
    }
    return animationFrame;
  }
  export function eggOrangeAnimation1(image,animationFrame) {
    switch (animationFrame) {
      case 1:
        image.x = 60;
        image.y = 90;
        image.width = 200;
        image.height = 200;
        image.href = "../resources/eggImages/orangeEgg/sprite_0.png";
        animationFrame = 2;
        break;
      case 2:
        image.y = image.y + 5;
  
        animationFrame = 3;
        break;
      case 3:
        image.y = image.y - 5;
        animationFrame = 1;
        break;
    }
    return animationFrame;
  }
  export function eggOrangeAnimation2(image,animationFrame) {
    switch (animationFrame) {
      case 1:
        image.href = "../resources/eggImages/orangeEgg/sprite_1.png";
        animationFrame = 2;
        break;
      case 2:
        image.y = image.y + 5;
  
        animationFrame = 3;
        break;
      case 3:
        image.y = image.y - 5;
        animationFrame = 1;
        break;
    }
    return animationFrame;
  }
  export function eggOrangeAnimation3(image,animationFrame) {
    switch (animationFrame) {
      case 1:
        image.href = "../resources/eggImages/orangeEgg/sprite_2.png";
        animationFrame = 2;
        break;
      case 2:
        image.y = image.y + 5;
  
        animationFrame = 3;
        break;
      case 3:
        image.y = image.y - 5;
        animationFrame = 1;
        break;
    }
    return animationFrame;
  }
  export function eggOrangeAnimation4(image,animationFrame) {
    switch (animationFrame) {
      case 1:
        image.href = "../resources/eggImages/orangeEgg/sprite_3.png";
        animationFrame = 2;
        break;
      case 2:
        image.y = image.y + 5;
  
        animationFrame = 3;
        break;
      case 3:
        image.y = image.y - 5;
        animationFrame = 1;
        break;
    }
    return animationFrame;
  }
  export function eggGreenAnimation1(image,animationFrame) {
    switch (animationFrame) {
      case 1:
        image.x = 60;
        image.y = 90;
        image.width = 200;
        image.height = 200;
        image.href = "../resources/eggImages/greenEgg/sprite_0.png";
        animationFrame = 2;
        break;
      case 2:
        image.y = image.y + 5;
  
        animationFrame = 3;
        break;
      case 3:
        image.y = image.y - 5;
        animationFrame = 1;
        break;
    }
    return animationFrame;
  }
  export function eggGreenAnimation2(image,animationFrame) {
    switch (animationFrame) {
      case 1:
        image.href = "../resources/eggImages/greenEgg/sprite_1.png";
        animationFrame = 2;
        break;
      case 2:
        image.y = image.y + 5;
  
        animationFrame = 3;
        break;
      case 3:
        image.y = image.y - 5;
        animationFrame = 1;
        break;
    }
    return animationFrame;
  }
  export function eggGreenAnimation3(image,animationFrame) {
    switch (animationFrame) {
      case 1:
        image.href = "../resources/eggImages/greenEgg/sprite_2.png";
        animationFrame = 2;
        break;
      case 2:
        image.y = image.y + 5;
  
        animationFrame = 3;
        break;
      case 3:
        image.y = image.y - 5;
        animationFrame = 1;
        break;
    }
    return animationFrame;
  }
  export function eggGreenAnimation4(image,animationFrame) {
    switch (animationFrame) {
      case 1:
        image.href = "../resources/eggImages/greenEgg/sprite_3.png";
        animationFrame = 2;
        break;
      case 2:
        image.y = image.y + 5;
  
        animationFrame = 3;
        break;
      case 3:
        image.y = image.y - 5;
        animationFrame = 1;
        break;
    }
    return animationFrame;
  }
  export function eggPurpleAnimation1(image,animationFrame) {
    switch (animationFrame) {
      case 1:
        image.x = 60;
        image.y = 90;
        image.width = 200;
        image.height = 200;
        image.href = "../resources/eggImages/purpleEgg/sprite_0.png";
        animationFrame = 2;
        break;
      case 2:
        image.y = image.y + 5;
  
        animationFrame = 3;
        break;
      case 3:
        image.y = image.y - 5;
        animationFrame = 1;
        break;
    }
    return animationFrame;
  }
  export function eggPurpleAnimation2(image,animationFrame) {
    switch (animationFrame) {
      case 1:
        image.href = "../resources/eggImages/purpleEgg/sprite_1.png";
        animationFrame = 2;
        break;
      case 2:
        image.y = image.y + 5;
  
        animationFrame = 3;
        break;
      case 3:
        image.y = image.y - 5;
        animationFrame = 1;
        break;
    }
    return animationFrame;
  }
  export function eggPurpleAnimation3(image,animationFrame) {
    switch (animationFrame) {
      case 1:
        image.href = "../resources/eggImages/purpleEgg/sprite_2.png";
        animationFrame = 2;
        break;
      case 2:
        image.y = image.y + 5;
  
        animationFrame = 3;
        break;
      case 3:
        image.y = image.y - 5;
        animationFrame = 1;
        break;
    }
    return animationFrame;
  }
  export function eggPurpleAnimation4(image,animationFrame) {
    switch (animationFrame) {
      case 1:
        image.href = "../resources/eggImages/purpleEgg/sprite_3.png";
        animationFrame = 2;
        break;
      case 2:
        image.y = image.y + 5;
  
        animationFrame = 3;
        break;
      case 3:
        image.y = image.y - 5;
        animationFrame = 1;
        break;
    }
    return animationFrame;
  }
  export function deadAnimation(image,animationFrame) {
    switch (animationFrame) {
      case 1:
        console.log("I'm dead...");
        image.href = "../resources/petImages/dead.png";
        image.width = 250;
        image.height = 150;
        image.x = 45;
        image.y = 120;
        animationFrame = 2;
        break;
      case 2:
        image.y = image.y - 5;
        animationFrame = 3;
        break;
      case 3:
        image.y = image.y + 5;
        animationFrame = 1;
        break;
    }
    return animationFrame;
  }