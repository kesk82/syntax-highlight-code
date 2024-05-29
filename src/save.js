/**
 * WordPress dependencies
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';
import './prism';
window.Prism = window.Prism || {};
Prism.manual = true;

/**
 * Internal dependencies
 */

export default function save( { attributes } ) {
	return (
		<pre { ...useBlockProps.save() }>
      <RichText.Content
				tagName="code"
        className={attributes.language ? "language-" + (attributes.language) : ""}
				value={ attributes.language ? Prism.highlight(attributes.content, Prism.languages[attributes.language], attributes.language ) : attributes.content }
			/>
		</pre>
	);
}