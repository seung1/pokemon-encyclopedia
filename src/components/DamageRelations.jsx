import React, { useEffect } from "react";

const DamageRelations = ({ damages }) => {
  const separateObjectBetweenToAndFrom = (damage) => {
    const from = filterDamageRelations("_from", damage);
    const to = filterDamageRelations("_to", damage);
    return { from, to };
  };

  const filterDamageRelations = (valueFilter, damage) => {
    return Object.entries(damage)
      .filter(([keyName, value]) => keyName.includes(valueFilter))
      .reduce((acc, [keyName, value]) => {
        const keyWithValueFilterRemove = keyName.replace(valueFilter, "");
        return (acc = { [keyWithValueFilterRemove]: value, ...acc });
      }, {});
  };

  const postDamageValue = (props) => {
    return Object.entries(props).reduce((acc, [keyName, value]) => {
      const valuesOfKeyName = {
        double_damage: "2x",
        half_damage: "1/2x",
        no_damage: "0x",
      };

      return (acc = {
        [keyName]: value.map((i) => ({
          damageValue: valuesOfKeyName[keyName],
          ...i,
        })),
        ...acc,
      });
    }, {});
  };

  useEffect(() => {
    const arrayDamage = damages.map((damage) => {
      separateObjectBetweenToAndFrom(damage);
    });

    if (arrayDamage.length === 2) {
    } else {
      const result = postDamageValue(arrayDamage[0].from);
      console.log(result);
    }
  }, []);

  return <div>DamageRelations</div>;
};

export default DamageRelations;
