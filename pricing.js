// Pricing pages helpers
(function(){
  // Keep Pricing button behavior
  const btn = document.querySelector('#pricingToggleBtn');
  if(btn){
    btn.addEventListener('click', (e)=>{
      e.preventDefault();
      window.location.href = 'pricing.html';
    });
  }

  // Replace all placeholder prices in independent service cards with 'buy now'
  const priceTags = document.querySelectorAll('.inst-price-tag');
  priceTags.forEach(el => {
    el.textContent = 'buy now';
  });
})();