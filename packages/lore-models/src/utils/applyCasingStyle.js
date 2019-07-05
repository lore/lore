import _ from 'lodash';

const CasingStyles = {
  Camel: 'camel',
  Snake: 'snake',
  Kebab: 'kebab',
  Pascal: 'pascal'
};

export default function applyCasingStyle(casingStyle, modelName) {
  switch (casingStyle) {
    case CasingStyles.Camel:
      return _.camelCase(modelName);
    case CasingStyles.Kebab:
      return _.kebabCase(modelName);
    case CasingStyles.Pascal:
      return _.upperFirst(_.camelCase(modelName));
    case CasingStyles.Snake:
      return _.snakeCase(modelName);
    default:
      throw new Error(`Illegal casingStyle of '${casingStyle}' provided. Must be one of [${[
        CasingStyles.Camel,
        CasingStyles.Kebab,
        CasingStyles.Pascal,
        CasingStyles.Snake
      ]}]`);
  }
}
