const fs = require( 'fs' );

const walkSync = ( dir, fileList = [], relDir = '' ) => {
    fs.readdirSync( dir ).forEach( file => {

        if ( fs.statSync( `${dir}/${file}` ).isDirectory() ) {
            fileList = walkSync( `${dir}/${file}`, fileList, `${relDir}/${file}` );
        } else {
            fileList = fileList.concat( `${relDir}/${file}`.slice( 1 ) );
        }

    } );
    return fileList;
};

module.exports = function ( dir, isRecursive = false ) {
    const filesList = !isRecursive
        ? fs.readdirSync( dir ).filter( file => /\.(html|twig|js)$/.test( file ) )
        : walkSync( dir ).filter( file => /\.(html|twig|js)$/.test( file ) );

    return filesList.map( file => {
        const parts     = file.split( '.' );
        const filename  = parts[0];
        const extension = parts[parts.length - 1];

        return { filename, extension, fullFileName: file };
    } )
};