import {
    CustomElement as DatumCustomElement,
    CustomElementType,
} from 'datum';
import React, { FC } from 'react';
import { RenderElementProps } from 'slate-react';

export type RenderCustomElementProps<T extends CustomElementType> =
    & Omit<RenderElementProps, 'element'>
    & { element: DatumCustomElement<T> };

export type CustomElementRenderer<T extends CustomElementType> = FC<RenderCustomElementProps<T>>;

export type CustomElementRenderers = {
    [T in CustomElementType]: CustomElementRenderer<T>;
};

export interface CustomElement extends Omit<RenderElementProps, 'element'> {
    customElementRenderers: CustomElementRenderers;
    element: DatumCustomElement<CustomElementType>;
}

export const CustomElement: FC<CustomElement> = ({
    children,
    customElementRenderers,
    element,
    ...props
}) => {
    const CustomElementFC = customElementRenderers[element.subType];

    return (
        <CustomElementFC {...props} element={element}>
            {children}
        </CustomElementFC>
    );
};
