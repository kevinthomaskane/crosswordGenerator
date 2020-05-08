<template>
  <svg
    width="26px"
    viewBox="0 0 26 26"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    :style="{
      width,
      animation
    }"
  >
      <defs>
          <linearGradient x1="0%" y1="43.0595977%" x2="147.519392%" y2="50%" id="linearGradient-1">
              <stop stop-color="#FFFFFF" stop-opacity="0.614781476" offset="0%"></stop>
              <stop stop-color="#5AC5E1" stop-opacity="0" offset="100%"></stop>
          </linearGradient>
      </defs>
      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="bubbles" transform="translate(-198.000000, -14.000000)">
              <g id="bubble" transform="translate(196.132556, 11.605273)">
                  <ellipse id="Oval-2" stroke="#92DDF1" cx="15.0754125" cy="15.8341287" rx="12.2643378" ry="12.0599321"></ellipse>
                  <path d="M11.3131364,21.1119654 C12.9146349,20.8212331 10.1577821,18.2331957 9.47433126,14.5073418 C9.30594695,13.5893894 9.26728901,11.6116187 9.43328957,10.6953303 C9.77243125,8.82333913 10.2331158,7.60007673 11.3755318,5.79230773 C13.0265506,3.17972132 17.0189814,1.55121076 14.8424966,1.55121076 C13.1755924,1.55121076 10.926537,2.39788298 9.26740047,4.06756201 C7.26120207,6.08650817 6.1902977,9.17329684 5.98941582,10.9755219 C5.94132678,11.4069559 5.89480624,11.9208545 5.87658801,12.4841139 C5.8397261,13.6237869 5.92670869,14.9437023 6.42043385,16.0346475 C7.69241937,18.8452528 10.0632286,21.3388707 11.3131364,21.1119654 Z" id="Oval-3" fill="url(#linearGradient-1)" transform="translate(10.672861, 11.338775) rotate(37.000000) translate(-10.672861, -11.338775) "></path>
              </g>
          </g>
      </g>
  </svg>
</template>
<script>
export default {
  name: 'Bubble',
  props: {
    width: {
      type: String,
      required: true
    },
    animation: {
      type: String,
      required: true
    }
  }
}
</script>
<style lang="scss">
@keyframes up {
  to {
    transform: translateY(-200px)
  }
}
</style>
