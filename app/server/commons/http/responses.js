const _get = require('lodash/get');
const {
  OK, CREATED, UPDATED, DELETED, UNAUTHORIED,
} = require('./responseStatus');

function returnCreated(res, json) {
  res.status(CREATED).json({
    isOk: true,
    status: CREATED,
    data: json,
  });
}

function returnDeleted(res) {
  res.status(DELETED).json();
}

function returnUpdated(res, json) {
  res.status(UPDATED).json({
    isOk: true,
    status: UPDATED,
    data: json,
  });
}

function notAuthorized({ res, error, msg }) {
  const hasValidToken = _get(res, 'locals.hasValidToken');
  res.status(UNAUTHORIED).json({
    isOk: false,
    status: UNAUTHORIED,
    error,
    hasValidToken,
    msg,
  });
}

function return200(res, json) {
  res.status(OK).json(json);
}

function return400s({ res, error, status }) {
  const hasValidToken = _get(res, 'locals.hasValidToken');
  res.status(status).json({
    isOk: false,
    hasValidToken,
    error,
    status,
  });
}

function return500s({ res, error, status }) {
  const hasValidToken = _get(res, 'locals.hasValidToken');
  res.status(status).json({
    isOk: false,
    error,
    hasValidToken,
    status,
  });
}

module.exports = {
  returnCreated,
  returnDeleted,
  returnUpdated,
  notAuthorized,
  return200,
  return400s,
  return500s,
};
