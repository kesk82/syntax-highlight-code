/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { RichText, useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { createBlock, getDefaultBlockName } from '@wordpress/blocks';
import { addFilter } from '@wordpress/hooks';

import './editor.scss';

function wrapCoverBlockInContainer( element, blockType, attributes ) {
  // skip if element is undefined
  if ( ! element ) {
      return;
  }

  if (blockType.name === "create-block/syntax-highlight-code" && attributes.language) {
    element.props = { ...element.props,
      className: element.props.className + " language-" + attributes.language }
  }

  return element;
}

addFilter(
  'blocks.getSaveElement',
  'create-block/syntax-highlight-code',
  wrapCoverBlockInContainer
);

export default function CodeEdit( {
	attributes,
	setAttributes,
	onRemove,
	insertBlocksAfter,
	mergeBlocks,
} ) {
	const blockProps = useBlockProps();

	return (
		<pre { ...blockProps }>
      <InspectorControls key="settings">
        <PanelBody title="Syntax highlighting">
          <SelectControl
            label="Language"
            value={ attributes.language ? attributes.language : '' }
            options={ [
                { value: '', label: 'Select a Language', disabled: true },
                { label: 'C', value: 'c' },
                { label: 'C-like', value: 'clike' },
                { label: 'JavaScript', value: 'javascript' },
                { label: 'PHP', value: 'php' },
                { label: 'CSS', value: 'css' },
                { label: 'HTML', value: 'html' },
            ] }
            onChange={ ( language ) => setAttributes({ language }) }
            __nextHasNoMarginBottom
          />
        </PanelBody>
        
      </InspectorControls>

			<RichText
				tagName="code"
				identifier="content"
				value={ attributes.content ? attributes.content.replaceAll('<', '&lt;') : '' }
				onChange={ ( content ) => setAttributes( { content: content.replaceAll('&lt;', '<') } ) }
				onRemove={ onRemove }
				onMerge={ mergeBlocks }
        className={attributes.language ? "language-" + (attributes.language) : ""}
				placeholder={ __( 'Write code…' ) }
				aria-label={ __( 'Code' ) }
				preserveWhiteSpace
				__unstablePastePlainText
				__unstableOnSplitAtDoubleLineEnd={ () =>
					insertBlocksAfter( createBlock( getDefaultBlockName() ) )
				}
			/>
		</pre>
	);
}