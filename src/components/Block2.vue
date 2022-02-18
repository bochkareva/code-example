<template>
    <div class="question">

      <div class="question__text">
       <h1>Анализ рынка мороженого</h1> 

        <p>Следующим шагом нужно проанализировать уровень спроса на мороженое. Удивительно, но он продолжает расти даже на фоне снижения реальных доходов населения. Причины подобного роста ты смог найти в интервью главы одной из компаний-лидеров по производству мороженого Давида Кучински (Все имена и герои вымышлены. Любые совпадения случайны):
        </p>
        
      </div>

      <div class="question__media-block2">
        <img class="media__img" src="../assets/images/Question4_img.png" alt="Картинка вопроса">
        <div class="media__text"> 
            <p>
                «The ice cream consumption is quite seasonal. 60% of sales account for the period from May to September. In the previous years, especially in 2020, the summer was hot, which led to demand growth. Moreover, the lockdown opened up new ways of consumption. Producers experiment with flavors, and develop the so-called “family pack” direction by enlarging size of ice cream packs, launching ice-cream boxes which contain several units of eskimo.
            </p>
            <p>
                We are seeing regular and stable market growth. If we look at if we look at foreign markets, such as in France or USA, our market still has great potential for development and growth of ice-cream consumption. But we need to take into account the restraining factors. For wxample, last year the mandatory digital labelling system of dairy products was introduced, which is substantially raising producer costs. Also, the inflation is continuously pushing up prices of ingredients»
            </p>
        </div>
      </div>

    </div>
</template>

<script>
export default {
}
</script>


<style>
.question__media-block2 {
  background: white;
  margin-top: 24px;
  margin-bottom: 24px;
  display: flex;
}

@media screen and (max-width: 768px) {
  .question__media-block2 {
    display: block;
    margin-bottom: 8px;
  }
}
.media__text {
  padding-right: 16px;
  padding-top: 24px;
  margin-left: -16px;
}
.media__text p {
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.005em;
  margin-bottom: 8px;
}
.media__img {
  height: 280px;
}

@media screen and (max-width: 768px) {
  .media__text {
    padding: 16px 12px;
    margin-left: 0;
  }
}
</style>