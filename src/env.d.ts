/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module "*.vue" {
	// https://github.com/vuejs/test-utils/blob/main/src/vueShims.d.ts 🤷‍♂️
	// https://github.com/vuejs/test-utils/issues/194#issuecomment-695333180 🤷‍♂️
	// import Vue from "vue";
	// export default Vue;

	import type { DefineComponent } from 'vue';
  const component: DefineComponent;
  export default component;
}
