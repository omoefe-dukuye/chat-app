export default (...str) => str.every(candidate => (typeof candidate === 'string') && (candidate.trim().length > 1));
