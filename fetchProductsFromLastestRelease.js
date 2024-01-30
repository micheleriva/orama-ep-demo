const { createReadStream, createWriteStream } = require('fs');
const ndjson = require('ndjson')

const fetchProducts = async () => {
	let writer = createWriteStream('./91b26666-61a6-46c3-b8f1-6a1305d62fd4-enriched.json')

	writer.write('[\n')

	createReadStream('./91b26666-61a6-46c3-b8f1-6a1305d62fd4.json')
		.pipe(ndjson.parse())
		.on('data', function(product) {
			const enrichedProduct = {
				...product,
				meta: {
					...product.meta,
					categories: [...(product.meta.bread_crumb_nodes || []), ...(product.meta?.bread_crumbs?.[Object.keys(product.meta.bread_crumbs)[0]] || [])]
				}
			}

			writer.write(JSON.stringify(enrichedProduct) + ',\n')
		})

	writer.write('\n]')
}

fetchProducts()