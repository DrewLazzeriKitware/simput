module.exports = {
  order: ['oscillators', 'analyses', 'run'],
  views: {
    oscillators: {
      size: -1,
      attributes: ['oscillator'],
      hooks: [
        {
          type: 'copyParameterToViewName',
          attribute: 'oscillator.name',
        },
      ],
    },
    analyses: {
      size: -1,
      attributes: ['analysis'],
      hooks: [
        {
          type: 'copyParameterToViewName',
          attribute: 'analysis.name',
        },
      ],
    },
    run: {
      attributes: ['runParams'],
    },
  },
  definitions: {
    oscillator: {
      parameters: [
        {
          id: 'name',
          label: 'Name',
          type: 'string',
          size: 1,
        },
        {
          id: 'type',
          type: 'enum',
          size: 1,
          default: 'periodic',
          domain: {
            Periodic: 'periodic',
            Damped: 'damped',
            Decaying: 'decaying',
          },
        },
        {
          id: 'center',
          type: 'int',
          size: 3,
          layout: '3',
          default: [0, 0, 0],
        },
        {
          id: 'radius',
          type: 'double',
          size: 1,
          default: [1],
        },
        {
          id: 'omega',
          type: 'double',
          size: 1,
          default: [0],
        },
        {
          id: 'zeta',
          type: 'double',
          size: 1,
          show: "type[0] === 'decaying'",
        },
      ],
    },
    analysis: {
      parameters: [
        {
          id: 'name',
          label: 'Name',
          type: 'string',
          size: 1,
        },
        {
          id: 'type',
          type: 'enum',
          size: 1,
          default: 'histogram',
          domain: {
            Histogram: 'histogram',
            Autocorrelation: 'autocorrelation',
          },
        },
        ["histogram", "autocorrelation"],
      ],
      children: {
        histogram: "analysis.type[0] === 'histogram'",
        autocorrelation: "analysis.type[0] === 'autocorrelation'",
      },
    },
    histogram: {
       parameters: [
          {
              id: 'mesh',
              type: 'enum',
              size: 1,
              default: 'mesh',
              domain: {
                Mesh: 'mesh',
                'Unstructured mesh': 'ucdmesh',
                'Particle velocity magnitude': 'particles',
              },
          },
          {
            id: 'bins',
            type: 'int',
            size: 1,
            default: [10],
          },
       ],
    },
    autocorrelation: {
       parameters: [
          {
              id: 'mesh',
              type: 'enum',
              size: 1,
              default: 'mesh',
              domain: {
                // currently only works on one type.
                Mesh: 'mesh',
              },
          },
          {
            id: 'window',
            type: 'double',
            size: 1,
            default: [10],
          },
          {
            id: 'kmax',
            type: 'double',
            size: 1,
            default: [3],
          },
       ],
    },
    runParams: {
      parameters: [
        {
          id: 'nodes',
          type: 'int',
          size: 1,
          default: [1],
        },
        {
          id: 'gridsize',
          type: 'int',
          size: 1,
          default: [64],
        },
        {
          id: 'dt',
          type: 'double',
          size: 1,
          default: [0.5],
        },
        {
          id: 'endT',
          type: 'double',
          size: 1,
          default: [10],
        },
      ],
    },
  },
};