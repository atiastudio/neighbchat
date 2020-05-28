const compose = (...funcs) => (comp) => {
  return funcs.reduceRight((wraped, func) => func(wraped), comp);
};

export default compose;
