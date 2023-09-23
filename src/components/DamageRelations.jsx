import React, { useEffect, useState } from "react";
import Type from "./Type";

const DamageRelations = ({ damages }) => {
  const [damagePokemonForm, setDamagePokemonForm] = useState();

  const separateObjectBetweenToAndFrom = (damage) => {
    const from = filterDamageRelations("_from", damage);
    const to = filterDamageRelations("_to", damage);

    return { from: from, to: to };
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

  const joinDamageRelations = (props) => ({
    to: joinObjects(props, "to"),
    from: joinObjects(props, "from"),
  });

  const joinObjects = (props, string) => {
    const key = string;
    const firstArrayValue = props[0][key];
    const secondArrayValue = props[1][key];

    return Object.entries(secondArrayValue).reduce((acc, [keyName, value]) => {
      const result = firstArrayValue[keyName].concat(value);

      return (acc = { [keyName]: result, ...acc });
    }, {});
  };

  const filterForUniqueValues = (valueForFiltering, damageValue) => {
    return valueForFiltering.reduce((acc, currentValue) => {
      const { url, name } = currentValue;
      const filterACC = acc.filter((a) => a.name !== name);
      return filterACC.length === acc.length
        ? (acc = [currentValue, ...acc])
        : (acc = [{ damageValue: damageValue, name, url }, ...acc]);
    }, []);
  };

  const reduceDuplicateValues = (props) => {
    const duplicateValues = {
      double_damage: "4x",
      half_damage: "1/4x",
      no_damage: "0x",
    };

    return Object.entries(props).reduce((acc, [keyName, value]) => {
      const key = keyName;
      const verifiedValue = filterForUniqueValues(value, duplicateValues[key]);
      return (acc = { [keyName]: verifiedValue, ...acc });
    }, {});
  };

  useEffect(() => {
    const arrayDamage = damages.map((damage) =>
      separateObjectBetweenToAndFrom(damage)
    );

    if (arrayDamage?.length === 2) {
      const result = joinDamageRelations(arrayDamage);
      setDamagePokemonForm(reduceDuplicateValues(postDamageValue(result.from)));
    } else {
      const result = postDamageValue(arrayDamage[0].from);
      setDamagePokemonForm(result);
    }
  }, []);

  return (
    <div className="flex gap-2 flex-col">
      {damagePokemonForm ? (
        Object.entries(damagePokemonForm).map(([keyName, value]) => {
          const key = keyName;
          const valuesOfKeyName = {
            double_damage: "Weak",
            half_damage: "Resistant",
            no_damage: "Immune",
          };

          return (
            <div key={key}>
              <h3 className="capitalize font-medium text-sm md:text-base text-slate-500 text-center">
                {valuesOfKeyName[key]}
              </h3>
              <div className="flex flex-wrap gap-1 justify-center">
                {value?.length > 0 ? (
                  value.map(({ name, damageValue }, idx) => (
                    <Type type={name} key={idx} damageValue={damageValue} />
                  ))
                ) : (
                  <Type type={"none"} key={"none"} />
                )}
              </div>
            </div>
          );
        })
      ) : (
        <div>...Loading</div>
      )}
    </div>
  );
};

export default DamageRelations;
