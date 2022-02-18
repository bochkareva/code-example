<template>
  <div class="question">
    <div class="question__text">
      <h1>Создание прототипа продукта</h1>

      <p>Финальная презентация прошла успешно. Вы с коллегами договорились о создании тестовой партии продукта, чтобы
        провести внутреннее исследование вкусовых предпочтений. Команда начала с изучения существующих рецептур
        мороженого и определения себестоимости продукта. Параллельно и команда маркетологов работала над определением
        целевой аудитории продукта и его позиционированием.
      </p>
      <p>Себестоимость каждого килограмма мороженого включает в себя:</p>
      <ul>
        <li>стоимость основных ингредиентов — 60%;</li>
        <li>упаковку (лотки, полиэтиленовые обертки и пр.) — 10%;</li>
        <li>заработную плату сотрудников — 20%;</li>
        <li>амортизацию оборудования, ремонт, инвентарь — 10%.</li>
      </ul>
      <p>Мороженое может быть дополнено вкусовыми добавками: орехами, джемами, сиропами, медом, шоколадной крошкой,
        кокосовой стружкой и другие. Использование добавок увеличивает себестоимость продукта на 5%. Некоторые виды
        мороженого не могут существовать без глазури — она увеличивает стоимость продукта на 4%, а использование
        вафельных стаканчиков и трубочек — на 3%.
      </p>
    </div>
    <div class="question__media-block3">
      <h2>Рецептуры мороженого</h2>
      <img src="../assets/images/question5_img_1.png" alt="Картинка вопроса 1">
      <h2>Закупочная стоимость продуктов в 2022 году</h2>
      <img src="../assets/images/question5_img_2.png" alt="Картинка вопроса 2">
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.question__text {
  ul {
    margin: -16px 0 16px;
    padding-inline-start: 24px;

    li {
      position: relative;
      font-size: 16px;
      line-height: 22px;
      letter-spacing: -0.005em;
    }
  }
}

li {
  position: relative;

  &:before {
    content: '';
    width: 4px;
    height: 4px;

    border-radius: 50%;
    background: #00162F;

    position: absolute;
    top: calc(50% - 1px);
    left: -14px;
  }
}

.question__media-block3 {
  max-width: 768px;
  margin: auto;
  margin-top: 24px;

  img {
    margin-top: 8px;
    margin-bottom: 24px;
    width: 100%;
  }

  h2 {
    margin: 0;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.005em;
    text-transform: uppercase;
    color: #00162F;
  }
}

@media screen and (max-width: 768px) {
  .question__media-block3 {
    margin-bottom: -16px;
  }
}
</style>