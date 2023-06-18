const { Price } = require('../models/prices')
const { PRICE_RECORD_ID } = require('../env')

const calculateBricksCementSandAndCrush = async (marla, generalQuestions) => {
  const price = await Price.findById(PRICE_RECORD_ID)

  const bricks = price.bricks.perMarla * marla * price.bricks.options[generalQuestions.brick]
  const cement = price.cement.perMarla * marla * price.cement.options[generalQuestions.cement]
  const sand = price.sand.perMarla * marla * price.sand.options[generalQuestions.sand]
  const crush = price.crush.perMarla * marla * price.crush.options[generalQuestions.crush]

  return {
    cost: bricks + cement + sand + crush,
    breakdown: [
      {
        name: 'bricks',
        label: 'Bricks',
        cost: bricks,
        ...price.bricks
      },
      {
        name: 'cement',
        label: 'Cement',
        cost: cement,
        ...price.cement
      },
      {
        name: 'sand',
        label: 'Sand',
        cost: sand,
        ...price.sand
      },
      {
        name: 'crush',
        label: 'Crush',
        cost: crush,
        ...price.crush
      }
    ]
  }
}

const getSteelByMarla = (marla) => {
  let steel = 3
  for (let i = 3; i < marla; i = i + 1) steel = steel + 0.5
  return steel
}

const calculateExcavationAndSteel = async (marla, generalQuestions) => {
  const price = await Price.findById(PRICE_RECORD_ID)

  const excavation = price.excavationAndBackFill.perMarla * marla * price.excavationAndBackFill.price
  const steel = price.steel.price * getSteelByMarla(marla)

  return {
    cost: excavation + steel,
    breakdown: [
      {
        name: 'excavationAndBackFill',
        label: 'Excavation And Back-Filling',
        cost: excavation,
        ...price.excavationAndBackFill
      },
      {
        name: 'steel',
        label: 'Steel',
        cost: steel,
        ...price.steel
      }
    ]
  }
}

const calculateInsulationAndProofing = async (marla, generalQuestions) => {
  const price = await Price.findById(PRICE_RECORD_ID)

  const roof = price.roofInsulation.perMarla * marla * price.roofInsulation.price
  const termite = price.termiteProofing.perMarla * marla * price.termiteProofing.price
  const water = price.waterProofing.perMarla * marla * price.waterProofing.price

  return {
    cost: roof + termite + water,
    breakdown: [
      {
        name: 'roofInsulation',
        label: 'Roof Insulation',
        cost: roof,
        ...price.roofInsulation
      },
      {
        name: 'termiteProofing',
        label: 'Termite Proofing',
        cost: termite,
        ...price.termiteProofing
      },
      {
        name: 'waterProofing',
        label: 'Water Proofing',
        cost: water,
        ...price.waterProofing
      }
    ]
  }
}

const calculateLaborCost = async (marla) => {
  const price = await Price.findById(PRICE_RECORD_ID)

  return {
    cost: price.labor.costPerMarla * marla
  }
}

const calculatePlumbingCost = async (marla) => {
  const price = await Price.findById(PRICE_RECORD_ID)

  const laborCost = price.plumbing.laborCost * marla
  const hotAndColdWaterSupply = price.plumbing.hotAndColdWaterSupply * marla
  const drainageSystem = price.plumbing.drainageSystem * marla
  const gasPiping = price.plumbing.gasPiping * marla
  const pvcPipes = price.plumbing.pvcPipes * marla
  const acDrain = price.plumbing.acDrain * marla
  const armaflexInsulation = price.plumbing.armaflexInsulation * marla

  return {
    cost: laborCost + hotAndColdWaterSupply + drainageSystem + gasPiping + pvcPipes + acDrain + armaflexInsulation,
    breakdown: [
      {
        name: 'laborCost',
        label: 'Labor Cost',
        cost: laborCost,
        perMarla: price.plumbing.laborCost
      },
      {
        name: 'hotAndColdWaterSupply',
        label: 'Hot & Cold Water Supply',
        cost: hotAndColdWaterSupply,
        perMarla: price.plumbing.hotAndColdWaterSupply
      },
      {
        name: 'drainageSystem',
        label: 'Drainage System',
        cost: drainageSystem,
        perMarla: price.plumbing.drainageSystem
      },
      {
        name: 'gasPiping',
        label: 'Gas Piping',
        cost: gasPiping,
        perMarla: price.plumbing.gasPiping
      },
      {
        name: 'pvcPipes',
        label: 'PVC Pipes',
        cost: pvcPipes,
        perMarla: price.plumbing.pvcPipes
      },
      {
        name: 'acDrain',
        label: 'Air-Conditioner Drains',
        cost: acDrain,
        perMarla: price.plumbing.acDrain
      },
      {
        name: 'armaflexInsulation',
        label: 'Armaflex Insulation',
        cost: armaflexInsulation,
        perMarla: price.plumbing.armaflexInsulation
      }
    ]
  }
}

const calculateElectricCost = async (marla) => {
  const price = await Price.findById(PRICE_RECORD_ID)

  const switches = price.electric.switches * marla
  const accessories = price.electric.accessories * marla
  const laborCost = price.electric.laborCost * marla

  return {
    cost: laborCost + accessories + switches,
    breakdown: [
      {
        name: 'switches',
        label: 'Switches & Sockets',
        cost: switches,
        perMarla: price.electric.switches
      },
      {
        name: 'accessories',
        label: 'Accessories',
        cost: accessories,
        perMarla: price.electric.accessories
      },
      {
        name: 'laborCost',
        label: 'Labor Cost',
        cost: laborCost,
        perMarla: price.electric.laborCost
      }
    ]
  }
}

const generateQuote = async (marla, generalQuestions, securityQuestions) => {
  const bricksCementSandCrush = await calculateBricksCementSandAndCrush(marla, generalQuestions)
  const excavationAndSteel = await calculateExcavationAndSteel(marla, generalQuestions)
  const insulationAndProofing = await calculateInsulationAndProofing(marla, generalQuestions)
  const laborCost = await calculateLaborCost(marla)
  const plumbing = generalQuestions.plumbing === 'yes' ? await calculatePlumbingCost(marla) : null
  const electric = generalQuestions.electric === 'yes' ? await calculateElectricCost(marla) : null

  const breakdown = [
    {
      name: 'bricksCementSandCrush',
      label: 'Bricks, Cement, Sand, and Crush',
      ...bricksCementSandCrush
    },
    {
      name: 'excavationAndSteel',
      label: 'Excavation & Steel Reinforcement',
      ...excavationAndSteel
    },
    {
      name: 'insulationAndProofing',
      label: 'Insulation & Proofing',
      ...insulationAndProofing
    },
    {
      name: 'laborCost',
      label: 'Labor Cost',
      ...laborCost
    }
  ]

  if (plumbing) {
    breakdown.push({
      name: 'plumbing',
      label: 'Plumbing',
      ...plumbing
    })
  }

  if (electric) {
    breakdown.push({
      name: 'electric',
      label: 'Electric Work & Wiring',
      ...electric
    })
  }

  return {
    price: bricksCementSandCrush.cost + excavationAndSteel.cost + insulationAndProofing.cost + laborCost.cost,
    breakdown
  }
}

module.exports = {
  generateQuote
}
