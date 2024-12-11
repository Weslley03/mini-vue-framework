export function reactive(obj) {
  const deps = new Map();

  const depend = (key) => {
    if(!deps.has(key)) deps.set(key, new Set());
    return deps.get(key);
  };

  const notify = (key) => {
    depend.get(key).forEach(effect => effect());
  };

  return new Proxy(obj, {
    get(target, key) {
      if(activeEffect) {
        depend(key).add(activeEffect);
      }
      return target[key];
    },

    set(target, key, value) {
      target[key] = value;
      notify(key);
      return true;
    },
  });
};

let activeEffect = null;

export function watchEffect(effect) {
  activeEffect = effect;
  effect();
  activeEffect = null;
}