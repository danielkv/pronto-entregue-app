export default function getProductFinalPrice(product) {
	if (!product) return 0;
	return product?.sale?.progress ? product.sale.price : product.price;
}