function getExternal(dataModel) {
  if (!dataModel.external) {
    dataModel.external = {};
  }
  return dataModel.external;
}

function pushMaterialsToExternalHook(hookConfig, dataModel, currentViewData) {
  const external = getExternal(dataModel);

  // Fill materials
  if (dataModel.data.Materials) {
    const mats = dataModel.data.Materials;
    external.materials = {};
    external.materialNames = {};
    for (let i = 0; i < mats.length; i++) {
      const name = mats[i].name;
      const id = mats[i].id;
      const currentMaterial = { name };
      // Gather material fields
      if (mats[i].material) {
        Object.keys(mats[i].material).forEach((key) => {
          currentMaterial[key] = mats[i].material[key].value;
        });

        // save to external
        external.materials[id] = currentMaterial;
        external.materialNames[name] = id;
      }
    }
  }
}

function pushCellsToExternalHook(hookConfig, dataModel, currentViewData) {
  const external = getExternal(dataModel);

  // Fill cells
  if (dataModel.data.Cells) {
    const cells = dataModel.data.Cells;
    external.cells = {};
    for (let i = 0; i < cells.length; i++) {
      const name = cells[i].name;
      const id = cells[i].id;
      const currentCell = { name };
      // Gather cell fields
      if (cells[i].cell) {
        Object.keys(cells[i].cell).forEach((key) => {
          currentCell[key] = cells[i].cell[key].value;
        });

        // save to external
        external.cells[id] = currentCell;
      }
    }
  }
}

function updateMaterialUsed(hookConfig, dataModel, currentViewData) {
  const mats = dataModel.data.Materials;
  const usedMats = {};

  if (dataModel.data.Cells) {
    const cells = dataModel.data.Cells;
    for (let i = 0; i < cells.length; i++) {
      cells[i].cell.cell.value[0].mats.forEach((m) => {
        usedMats[m] = true;
      });
    }
  }

  for (let i = 0; i < mats.length; i++) {
    mats[i].noDelete = mats[i].id in usedMats;
  }
}

function addNextView(hookConfig, dataModel, currentViewData, model) {
  const { viewName, nextViewName } = hookConfig;
  if (dataModel.data[viewName].length) {
    if (model.order.indexOf(nextViewName) === -1) {
      const insertIndex = 1 + model.order.indexOf(viewName);
      model.order.splice(insertIndex, 0, nextViewName);
    }
  } else {
    // remove view
    const indexToDelete = model.order.indexOf(nextViewName);
    if (indexToDelete !== -1) {
      model.order.splice(indexToDelete, 1);
    }
  }
}

module.exports = function initialize() {
  Simput.registerHook('materialsToExternal', pushMaterialsToExternalHook);
  Simput.registerHook('cellsToExternal', pushCellsToExternalHook);
  Simput.registerHook('updateMaterialUsed', updateMaterialUsed);
  Simput.registerHook('addNextView', addNextView);
};