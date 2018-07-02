export default class Visitor {
    constructor() {

    }

    visit(ast) {
        ast.forEach(item => this.visitAstItem(item));
    }

    visitIdentifier(identifier) {
        
    }

    visitTypeIdentifier(identifier) {
        
    }

    visitAstItem(item) {
        if(item.Struct) {
            this.visitStruct(item.Struct);
        }
    }

    visitStruct(struct) {
        this.visitIdentifier(struct.struct_name);
        struct.struct_member.forEach(member => this.visitStructMember(member));
    }

    visitStructMember(structMember) {
        this.visitIdentifier(structMember.struct_member_name);
        this.visitTypeIdentifier(structMember.struct_member_type_name);
    }

    
}
