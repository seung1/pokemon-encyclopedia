import React, { useEffect } from "react";

const DamageRelations = ({ damages }) => {
const separateObjectBetweenToAndFrom =(damage)=>{
    const from filterDamageRelations('_from',damage)

    const to = filterDamageRelations ('_to',damage)
}

const filterDamageRelations = (valueFilter,damage )=>{
Object.entries(damage).filter(([keyName,value])=>
)}

  useEffect(() => {
    const arrayDamage = damages.map((damage) => {
      separateObjectBetweenToAndFrom(damage);
    });
  }, []);

  return <div>DamageRelations</div>;
};

export default DamageRelations;
