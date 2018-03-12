'use strict';

var fs = require('fs'),
    path = require('path'),
    bn = require('@bem/naming'),
    BemCell = require('@bem/cell'),
    BemEntityName = require('@bem/entity-name'),
    bemFs = require('@bem/fs-scheme'),
    bemImport = require('@bem/import-notation'),
    bemConfig = require('bem-config')(),
    requiredPath = require('required-path'),
    template = require('babel-template'),
    logSymbols = require('log-symbols'),
    generators = require('./generators');

module.exports = function (_ref) {
    var t = _ref.types;


    return {
        visitor: {
            CallExpression: function CallExpression(p, _ref2) {
                var opts = _ref2.opts,
                    filename = _ref2.file.opts.filename;
                var naming = opts.naming,
                    _opts$techs = opts.techs,
                    techs = _opts$techs === undefined ? ['js'] : _opts$techs,
                    levelsMap = bemConfig.levelMapSync() || opts.levels,
                    levels = Array.isArray(levelsMap) ? levelsMap : Object.keys(levelsMap),
                    techMap = techs.reduce(function (acc, tech) {
                    acc[tech] || (acc[tech] = [tech]);
                    return acc;
                }, opts.techMap || {}),
                    extToTech = Object.keys(techMap).reduce(function (acc, tech) {
                    techMap[tech].forEach(function (ext) {
                        acc[ext] = tech;
                    });
                    return acc;
                }, {}),
                    defaultExts = Object.keys(extToTech),
                    namingOptions = naming || 'react',
                    bemNaming = bn(namingOptions);


                opts.langs && (generators.i18n = require('./generators/i18n').generate(opts.langs));

                // skip all except require('bemstring')
                if (!(p.node.callee.type === 'Identifier' && p.node.callee.name === 'require' && Object(p.node.arguments[0]).value)) return;

                var bemFiles = bemImport.parse(p.node.arguments[0].value, bemNaming.parse(path.basename(filename).split('.')[0]))
                // expand entities by all provided levels
                .reduce(function (acc, entity) {
                    levels.forEach(function (layer) {
                        // if entity has tech get extensions for it or exactly it,
                        // otherwise expand entities by default extensions
                        (entity.tech ? techMap[entity.tech] || [entity.tech] : defaultExts).forEach(function (tech) {
                            acc.push(BemCell.create({ entity: entity, tech: tech, layer: layer }));
                        });
                    });
                    return acc;
                }, [])
                // find path for every entity and check it existance
                .map(function (bemCell) {
                    var localNamingOpts = levelsMap[bemCell.layer].naming || namingOptions;
                    var fsScheme = levelsMap[bemCell.layer].scheme || 'nested';
                    var entityPath = path.resolve(bemFs(fsScheme).path(bemCell, localNamingOpts)).replace(/\\/g,'/');
                    // BemFile
                    return {
                        cell: bemCell,
                        exist: fs.existsSync(entityPath),
                        // prepare path for require cause relative returns us string that we couldn't require
                      path: requiredPath(path.relative(path.dirname(filename), entityPath)).replace(/\\/g,'/')
                    };
                });

                if (!bemFiles.length) return;

                /**
                 * techToFiles:
                 *   js: [enity, entity]
                 *   css: [entity, entity, entity]
                 *   i18n: [entity]
                 */
                var techToFiles = {},
                    existsEntities = {},
                    errEntities = {};

                bemFiles.forEach(function (file) {
                    var _file$cell = file.cell,
                        tech = _file$cell.tech,
                        entity = _file$cell.entity,
                        id = entity.id,
                        block = entity.block,
                        elem = entity.elem,
                        modName = entity.modName;


                    if (!file.exist) {
                        // there are no realizations found neither on levels not in techs
                        existsEntities[id] || (existsEntities[id] = false);
                        (errEntities[id] || (errEntities[id] = [])).push(file);
                        return;
                    }

                    (techToFiles[tech] || (techToFiles[tech] = [])).push(file);
                    existsEntities[id] = true;

                    // Add existence for `_mod` if `_mod_val` exists.
                    entity.mod && !entity.isSimpleMod() && (existsEntities[BemEntityName.create({ block: block, elem: elem, modName: modName }).id] = true);
                });

                Object.keys(existsEntities).forEach(function (fileId) {
                    // check if entity has no tech to resolve
                    existsEntities[fileId] || errEntities[fileId].forEach(function (file) {
                        console.warn(logSymbols.warning + ' BEM module not found: ' + file.path);
                    });
                });
                // Each tech has own generator
                var values = Object.keys(techToFiles)
                // js tech is always last
                .sort(function (a) {
                    return extToTech[a] === 'js';
                }).map(function (tech) {
                    return (generators[extToTech[tech] || tech] || generators['*'])(techToFiles[tech]);
                });
                p.replaceWith(values.length ? template('(' + values.join(',\n') + ')')() : t.EmptyStatement());
            }
        }
    };
};
