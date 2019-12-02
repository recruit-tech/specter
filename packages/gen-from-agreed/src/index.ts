import ts from "typescript";

const compilerOptions = {
  noEmit: true,
  noEmitOnError: false,
  emitDecoratorMetadata: true,
  experimentalDecorators: true,
  target: ts.ScriptTarget.ES5,
  module: ts.ModuleKind.CommonJS,
  allowUnusedLabels: true
};

type R = {
  method: ts.Type
  path:ts.Type 
  requestHeader:ts.Type 
  requestQuery:ts.Type 
  requestBody:ts.Type
  response:ts.Type 
}

export function parseFromPath(path: string): R | undefined {
  const program = ts.createProgram([path], compilerOptions);
  const source = program.getSourceFile(path);
  const checker = program.getTypeChecker();
  if (source) {
    let res 
    ts.forEachChild(source, node => {
      if (ts.isTypeAliasDeclaration(node)) {
        const t = checker.getTypeAtLocation(node)
        if (t.aliasSymbol) {
          const string = checker.getFullyQualifiedName(t.aliasSymbol)
          if (/\/node_modules\/@agreed\/typed/.test(string) && /APIDef/.test(string)) {
            if (t.aliasTypeArguments) {
              res = {
                method: t.aliasTypeArguments[0],
                path: t.aliasTypeArguments[1],
                requestHeader: t.aliasTypeArguments[2],
                requestQuery: t.aliasTypeArguments[3],
                requestBody: t.aliasTypeArguments[4],
                response: t.aliasTypeArguments[5]
              }
            }
          }
        }
      }
    });
    return res
  }
  return undefined
}

function ExtendsService() {
  return [
    ts.createHeritageClause(
      ts.SyntaxKind.ExtendsKeyword,
      [ts.createExpressionWithTypeArguments(undefined, ts.createIdentifier('Service'))]
    )
  ]
}

function Request() {
  return ts.createTypeReferenceNode('Request', [ts.createTypeLiteralNode([]), ts.createTypeLiteralNode([]), ts.createTypeLiteralNode([])])
}

function ServiceArgs () {
  return [
    ts.createParameter(undefined, undefined, undefined, 'req', undefined, Request(), undefined),
  ]
}

function ServiceBlock() {
  return ts.createBlock([])
}

function ServiceClass() {
  return ts.createClassDeclaration(undefined, undefined, 'SampleService', undefined, ExtendsService(), [
    ts.createMethod(undefined, undefined, undefined, 'read', undefined, undefined, ServiceArgs(), undefined, ServiceBlock()),
    ts.createMethod(undefined, undefined, undefined, 'create', undefined, undefined, ServiceArgs(), undefined, ServiceBlock()),
    ts.createMethod(undefined, undefined, undefined, 'update', undefined, undefined, ServiceArgs(), undefined, ServiceBlock()),
    ts.createMethod(undefined, undefined, undefined, 'delete', undefined, undefined, ServiceArgs(), undefined, ServiceBlock()),
  ])
}

function NamedImport(variableName: string, moduleName: string) {
  return ts.createImportDeclaration(
    undefined,
    undefined,
    ts.createImportClause(
      undefined,
      ts.createNamedImports([ts.createImportSpecifier(
        undefined,
        ts.createIdentifier("Service")
      )])
    ),
    ts.createStringLiteral("@specter/specter")
  )
}

export function buildFromAST() {
  const xlass = ServiceClass()
  const inport = NamedImport("Service", '@specter/specter')
  
  const printer = ts.createPrinter()
  const source = ts.createSourceFile('test.ts', '', ts.ScriptTarget.Latest)
  const code = `/* --- generated code --- */
${printer.printNode(ts.EmitHint.Unspecified, inport, source)}

${printer.printNode(ts.EmitHint.Unspecified, xlass, source)}
  `
  console.log(code)
}

// buildAST()