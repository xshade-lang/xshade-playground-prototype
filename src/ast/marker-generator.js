import Visitor from './visitor';

export default class MarkerGenerator extends Visitor {
    
    generateMarkers(ast, code) {
        this._ast = ast;
        this._code = code;
        this._markers = [];

        this.visit(ast);

        return this._markers;
    }

    addMarker(spanned) {
        const span = spanned.span;
        const snippet = this._code.substr(span.offset, span.length);
        const lines = snippet.split(/\r\n|\r|\n/);
        const lastLine = lines[lines.length - 1];
    
        let startRow = span.line - 1;
        let startCol = span.column - 1;
    
        let endCol;
        let endRow;
        if(lines.length > 1) {
            endCol = lastLine.length - 1;
            endRow = span.line + lines.length - 1;
        } else {
            endCol = span.column + span.length - 1;
            endRow = startRow;
        }
    
        let marker = {
            startRow,
            startCol,
            endRow,
            endCol,
            className: 'foo',
            type: 'background',
        };
    
        this._markers.push(marker);
    }

    visitStruct(struct) {
        this.addMarker(struct);
        super.visitStruct(struct);
    }

    visitStructMember(member) {
        this.addMarker(member);
        super.visitStructMember(member);
    }

    visitIdentifier(identifier) {
        this.addMarker(identifier);
        super.visitIdentifier(identifier);
    }

    visitTypeIdentifier(typeIdentifier) {
        this.addMarker(typeIdentifier);
        super.visitTypeIdentifier(typeIdentifier);
    }
}
